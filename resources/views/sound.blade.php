<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>chaoswindow</title>


        <script language="javascript">

            /*
   The MIT License (MIT)

   Copyright (c) 2014 Chris Wilson

   Permission is hereby granted, free of charge, to any person obtaining a copy
   of this software and associated documentation files (the "Software"), to deal
   in the Software without restriction, including without limitation the rights
   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   copies of the Software, and to permit persons to whom the Software is
   furnished to do so, subject to the following conditions:

   The above copyright notice and this permission notice shall be included in all
   copies or substantial portions of the Software.

   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   SOFTWARE.
   */

            window.AudioContext = window.AudioContext || window.webkitAudioContext;

            var audioContext = null;
            var isPlaying = false;
            var sourceNode = null;
            var analyser = null;
            var theBuffer = null;
            var DEBUGCANVAS = null;
            var mediaStreamSource = null;
            var detectorElem,
                canvasElem,
                waveCanvas,
                pitchElem,
                noteElem,
                detuneElem,
                detuneAmount;

            window.onload = function() {
                audioContext = new AudioContext();
                MAX_SIZE = Math.max(4,Math.floor(audioContext.sampleRate/5000));	// corresponds to a 5kHz signal
                canvasElem = document.getElementById( "output" );

                detuneAmount = document.getElementById( "detune_amt" );


                init_grid();
                update();

                requestAnimationFrame(function(){
                    iterate();
                });
            }

            function error() {
                alert('Stream generation failed.');
            }

            function getUserMedia(dictionary, callback) {
                try {
                    navigator.getUserMedia =
                        navigator.getUserMedia ||
                        navigator.webkitGetUserMedia ||
                        navigator.mozGetUserMedia;
                    navigator.getUserMedia(dictionary, callback, error);
                } catch (e) {
                    alert('getUserMedia threw exception :' + e);
                }
            }

            function gotStream(stream) {
                // Create an AudioNode from the stream.
                mediaStreamSource = audioContext.createMediaStreamSource(stream);

                // Connect it to the destination.
                analyser = audioContext.createAnalyser();
                analyser.fftSize = 2048;
                mediaStreamSource.connect( analyser );
                updatePitch();
            }


            function toggleLiveInput() {
                if (isPlaying) {
                    //stop playing and return
                    sourceNode.stop( 0 );
                    sourceNode = null;
                    analyser = null;
                    isPlaying = false;
                    if (!window.cancelAnimationFrame)
                        window.cancelAnimationFrame = window.webkitCancelAnimationFrame;
                    window.cancelAnimationFrame( rafID );
                }
                getUserMedia(
                    {
                        "audio": {
                            "mandatory": {
                                "googEchoCancellation": "false",
                                "googAutoGainControl": "false",
                                "googNoiseSuppression": "false",
                                "googHighpassFilter": "false"
                            },
                            "optional": []
                        },
                    }, gotStream);
            }

            var rafID = null;
            var buflen = 1024;
            var buf = new Float32Array( buflen );

            var noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

            function noteFromPitch( frequency ) {
                var noteNum = 12 * (Math.log( frequency / 440 )/Math.log(2) );
                return Math.round( noteNum ) + 69;
            }

            function frequencyFromNoteNumber( note ) {
                return 440 * Math.pow(2,(note-69)/12);
            }

            function centsOffFromPitch( frequency, note ) {
                return Math.floor( 1200 * Math.log( frequency / frequencyFromNoteNumber( note ))/Math.log(2) );
            }

            // this is a float version of the algorithm below - but it's not currently used.
            /*
            function autoCorrelateFloat( buf, sampleRate ) {
                var MIN_SAMPLES = 4;	// corresponds to an 11kHz signal
                var MAX_SAMPLES = 1000; // corresponds to a 44Hz signal
                var SIZE = 1000;
                var best_offset = -1;
                var best_correlation = 0;
                var rms = 0;

                if (buf.length < (SIZE + MAX_SAMPLES - MIN_SAMPLES))
                    return -1;  // Not enough data

                for (var i=0;i<SIZE;i++)
                    rms += buf[i]*buf[i];
                rms = Math.sqrt(rms/SIZE);

                for (var offset = MIN_SAMPLES; offset <= MAX_SAMPLES; offset++) {
                    var correlation = 0;

                    for (var i=0; i<SIZE; i++) {
                        correlation += Math.abs(buf[i]-buf[i+offset]);
                    }
                    correlation = 1 - (correlation/SIZE);
                    if (correlation > best_correlation) {
                        best_correlation = correlation;
                        best_offset = offset;
                    }
                }
                if ((rms>0.1)&&(best_correlation > 0.1)) {
                    console.log("f = " + sampleRate/best_offset + "Hz (rms: " + rms + " confidence: " + best_correlation + ")");
                }
            //	var best_frequency = sampleRate/best_offset;
            }
            */

            var MIN_SAMPLES = 0;  // will be initialized when AudioContext is created.
            var GOOD_ENOUGH_CORRELATION = 0.9; // this is the "bar" for how close a correlation needs to be

            function autoCorrelate( buf, sampleRate ) {
                var SIZE = buf.length;
                var MAX_SAMPLES = Math.floor(SIZE/2);
                var best_offset = -1;
                var best_correlation = 0;
                var rms = 0;
                var foundGoodCorrelation = false;
                var correlations = new Array(MAX_SAMPLES);

                for (var i=0;i<SIZE;i++) {
                    var val = buf[i];
                    rms += val*val;
                }
                rms = Math.sqrt(rms/SIZE);
                if (rms<0.01) // not enough signal
                    return -1;

                var lastCorrelation=1;
                for (var offset = MIN_SAMPLES; offset < MAX_SAMPLES; offset++) {
                    var correlation = 0;

                    for (var i=0; i<MAX_SAMPLES; i++) {
                        correlation += Math.abs((buf[i])-(buf[i+offset]));
                    }
                    correlation = 1 - (correlation/MAX_SAMPLES);
                    correlations[offset] = correlation; // store it, for the tweaking we need to do below.
                    if ((correlation>GOOD_ENOUGH_CORRELATION) && (correlation > lastCorrelation)) {
                        foundGoodCorrelation = true;
                        if (correlation > best_correlation) {
                            best_correlation = correlation;
                            best_offset = offset;
                        }
                    } else if (foundGoodCorrelation) {
                        // short-circuit - we found a good correlation, then a bad one, so we'd just be seeing copies from here.
                        // Now we need to tweak the offset - by interpolating between the values to the left and right of the
                        // best offset, and shifting it a bit.  This is complex, and HACKY in this code (happy to take PRs!) -
                        // we need to do a curve fit on correlations[] around best_offset in order to better determine precise
                        // (anti-aliased) offset.

                        // we know best_offset >=1,
                        // since foundGoodCorrelation cannot go to true until the second pass (offset=1), and
                        // we can't drop into this clause until the following pass (else if).
                        var shift = (correlations[best_offset+1] - correlations[best_offset-1])/correlations[best_offset];
                        return sampleRate/(best_offset+(8*shift));
                    }
                    lastCorrelation = correlation;
                }
                if (best_correlation > 0.01) {
                    // console.log("f = " + sampleRate/best_offset + "Hz (rms: " + rms + " confidence: " + best_correlation + ")")
                    return sampleRate/best_offset;
                }
                return -1;
//	var best_frequency = sampleRate/best_offset;
            }

            function updatePitch( time ) {
                var cycles = new Array;
                analyser.getFloatTimeDomainData( buf );
                var ac = autoCorrelate( buf, audioContext.sampleRate );
                // TODO: Paint confidence meter on canvasElem here.

                if (DEBUGCANVAS) {  // This draws the current waveform, useful for debugging
                    waveCanvas.clearRect(0,0,512,256);
                    waveCanvas.strokeStyle = "red";
                    waveCanvas.beginPath();
                    waveCanvas.moveTo(0,0);
                    waveCanvas.lineTo(0,256);
                    waveCanvas.moveTo(128,0);
                    waveCanvas.lineTo(128,256);
                    waveCanvas.moveTo(256,0);
                    waveCanvas.lineTo(256,256);
                    waveCanvas.moveTo(384,0);
                    waveCanvas.lineTo(384,256);
                    waveCanvas.moveTo(512,0);
                    waveCanvas.lineTo(512,256);
                    waveCanvas.stroke();
                    waveCanvas.strokeStyle = "black";
                    waveCanvas.beginPath();
                    waveCanvas.moveTo(0,buf[0]);
                    for (var i=1;i<512;i++) {
                        waveCanvas.lineTo(i,128+(buf[i]*128));
                    }
                    waveCanvas.stroke();
                }

                if (ac == -1) {

                } else {
                    pitch = ac;
                    var note =  noteFromPitch( autoCorrelate( buf, audioContext.sampleRate ) );
                    console.log(noteStrings[note%12]);
                    var detune = centsOffFromPitch( pitch, note );
                    if (detune == 0 ) {
                    } else {
                        //detuneAmount.innerHTML = Math.abs( detune );
                    }
                }

                if (!window.requestAnimationFrame)
                    window.requestAnimationFrame = window.webkitRequestAnimationFrame;
                rafID = window.requestAnimationFrame( updatePitch );
            }






















            document.write('<canvas id="canvas" style="position:absolute; left:0; right:0; bottom:0; top:0; margin:auto;"></canvas>');
    var grid = [];
	grid[0] = [];

    var sz = 500;
	var timeout = 1;
	
    var earth = 0;
    var water = 1;
    var fire = 2;


	var canvas = document.getElementById('canvas');
			canvas.width = sz;
			canvas.height = sz;

	
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
	        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
	                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
	    }
		
		
	/**
     *
     **/
	function init_grid() {
	    for(var i=0; i<sz; i++){
			grid[0][i] = [];

			for(var j=0; j<sz; j++){
				grid[0][i][j] = Math.floor(Math.random() * 2); //earth

			}
	        
	    }

		var middle = Math.floor(sz/2);
		
	}
	
	var ctx, id, g;


    /**
     *
     **/
	function update(){
		
        if(!ctx){
			ctx = document
                    .getElementById('canvas')
                    .getContext('2d');

			id = ctx.createImageData( sz, sz ); // only do this once per page

			g  = id.data;                     // only do this once per page
		}

		var theNote = noteFromPitch( autoCorrelate( buf, audioContext.sampleRate ) ) % 12;
        var noteRGB = {
          0: {r: 255, g:0, b:255}, //violet
          1: {r: 128, g:0, b:255},
          2: {r: 0, g:0, b:255}, //blue
            3: {r: 0, g:128, b:128},
          4: {r: 0, g:255, b:0}, //green
            5: {r: 128, g:255, b:0},
          6: {r: 255, g:255, b:0}, //yellow
            7: {r: 255, g:192, b:0},
          8: {r: 255, g:128, b:0}, //orange
            9: {r: 255, g:64, b:0},
          10: {r: 255, g:0, b:0}, //red
          11: {r: 255, g:0, b:128},
            NaN: {r: 255, g: 255, b:255}
        };
        //console.log(theNote);
	    for( var i = 0; i < sz; i++ ){
	        for( var j = 0; j < sz; j++ ){

				var grid_state = grid[0][i][j];
	            
                var idx = 4 * (j + i * sz);

                if(grid_state == 1){
                    g[idx] = noteRGB[theNote].r;
                } else {
                    g[idx] = 0; //b
                }

				if(grid_state == 1){
					g[1 + idx] = noteRGB[theNote].g; //green
				} else {
					g[1 + idx] = 0; //green
				}


                if(grid_state == 1){
                    g[2 + idx] = noteRGB[theNote].b;
                } else {
                    g[2 + idx] = 0; //b
                }
				g[3 + idx] = 255; //alpha
	        }
	    }
		
		ctx.putImageData( id, 0,0 );
	}


	/**
     *
     * */
    function iterate() {

		var z;
		//grid[1] = grid[0].slice();
        var theNote = noteFromPitch( autoCorrelate( buf, audioContext.sampleRate ) ) % 12;
        if (!(theNote && theNote !== 0)) {
            var new_grid = [];
            for( var m=0; m<sz; m++ ) {
                new_grid[m] = [];
                for (var n = 0; n < sz; n++) {
                    new_grid[m][n] = grid[0][m][n];
                }
            }

            for( var i=0; i<sz; i++ ){
                for( var j = 0; j < sz; j++ ){

                    //The % on these lines makes this space a torus
                    var l = (sz + i - 1) % sz;
                    var r = (sz + i + 1) % sz;
                    var u = (sz + j - 1) % sz;
                    var d = (sz + j + 1) % sz;

                    var sum = grid[0][r][j] + grid[0][l][j] + grid[0][i][u] + grid[0][i][d] + grid[0][r][u] + grid[0][r][d] + grid[0][l][u] + grid[0][l][d];

                    if(sum < 2 || sum > 3) {
                        new_grid[i][j] = 0;
                    }
                }
            }

            for( var i=0; i<sz; i++ ){
                for( var j = 0; j < sz; j++ ){

                    //The % on these lines makes this space a torus
                    var l = (sz + i - 1) % sz;
                    var r = (sz + i + 1) % sz;
                    var u = (sz + j - 1) % sz;
                    var d = (sz + j + 1) % sz;

                    var sum = grid[0][r][j] + grid[0][l][j] + grid[0][i][u] + grid[0][i][d] + grid[0][r][u] + grid[0][r][d] + grid[0][l][u] + grid[0][l][d];

                    if(sum == 3) {
                        new_grid[i][j] = 1;
                    }
                }
            }

            for( var k=0; k<sz; k++ ) {
                for (var l = 0; l < sz; l++) {
                    grid[0][k][l] = new_grid[k][l];
                }
            }
        }

		
		
        update();
		
		requestAnimationFrame(function(){
			setTimeout(function(){iterate();}, timeout);
		});
    }




	
</script>
    </head>
    <body style="background-color:black">
    <button onclick="toggleLiveInput()">use live input</button>
    </body>
</html>
