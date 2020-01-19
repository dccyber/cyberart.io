<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>chaoswindow</title>


        <script language="javascript">
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
	init_grid();


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

	    for( var i = 0; i < sz; i++ ){
	        for( var j = 0; j < sz; j++ ){

				var grid_state = grid[0][i][j];
	            
                var idx = 4 * (j + i * sz);

				g[idx] = 0; //red

				if(grid_state == 1){
					g[1 + idx] = 255; //green
				} else {
					g[1 + idx] = 0; //green
				}


				g[2 + idx] = 0; //blue
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
		
		
        update();
		
		requestAnimationFrame(function(){
			setTimeout(function(){iterate();}, timeout);
		});
    }

	update();
	
	requestAnimationFrame(function(){
		iterate();
	});


	
</script>
    </head>
    <body style="background-color:black">
    </body>
</html>
