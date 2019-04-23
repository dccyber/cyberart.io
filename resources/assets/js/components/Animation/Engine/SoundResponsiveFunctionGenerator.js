// Adapted from code by Chris Wilson
// @see https://github.com/cwilso/PitchDetect

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

// TODO: clean this up, or replace with another library
class SoundResponsiveFunctionGenerator {
  constructor(soundEventCallback, sensitivity = 0.0001) {
    this.sensitivity = sensitivity;

    var audioContext = null;
    this.isPlaying = false;
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

    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioContext = new AudioContext();
    this.MAX_SIZE = Math.max(
      4,
      Math.floor(this.audioContext.sampleRate / 5000)
    ); // corresponds to a 5kHz signal

    this.detuneAmount = 0; //TODO: figure out what this needs to be

    this.rafID = null;
    this.buflen = 1024;
    this.buf = new Float32Array(this.buflen);

    this.noteStrings = [
      "C",
      "C#",
      "D",
      "D#",
      "E",
      "F",
      "F#",
      "G",
      "G#",
      "A",
      "A#",
      "B"
    ];

    this.MIN_SAMPLES = 0; // will be initialized when AudioContext is created.
    this.GOOD_ENOUGH_CORRELATION = 0.9; // this is the "bar" for how close a correlation needs to be

    this.toggleLiveInput = this.toggleLiveInput.bind(this);
    this.gotStream = this.gotStream.bind(this);
    this.updatePitch = this.updatePitch.bind(this);

    this.soundEventCallback = [soundEventCallback];
  }

  error() {
    alert("Stream generation failed.");
  }

  getUserMedia(dictionary, callback) {
    try {
      navigator.getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;
      navigator.getUserMedia(dictionary, callback, this.error);
    } catch (e) {
      alert("getUserMedia threw exception :" + e);
    }
  }

  gotStream(stream) {
    // Create an AudioNode from the stream.
    let mediaStreamSource = this.audioContext.createMediaStreamSource(stream);

    // Connect it to the destination.
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 2048;
    mediaStreamSource.connect(this.analyser);
    this.updatePitch();
  }

  toggleLiveInput() {
    if (this.isPlaying) {
      //stop playing and return
      this.sourceNode.stop(0);
      this.sourceNode = null;
      this.analyser = null;
      this.isPlaying = false;
      if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = window.webkitCancelAnimationFrame;
      window.cancelAnimationFrame(this.rafID);
    }
    this.getUserMedia(
      {
        audio: {
          mandatory: {
            googEchoCancellation: "false",
            googAutoGainControl: "false",
            googNoiseSuppression: "false",
            googHighpassFilter: "false"
          },
          optional: []
        }
      },
      this.gotStream
    );
  }

  noteFromPitch(frequency) {
    const noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
    return Math.round(noteNum) + 69;
  }

  frequencyFromNoteNumber(note) {
    return 440 * Math.pow(2, (note - 69) / 12);
  }

  centsOffFromPitch(frequency, note) {
    return Math.floor(
      (1200 * Math.log(frequency / this.frequencyFromNoteNumber(note))) /
        Math.log(2)
    );
  }

  autoCorrelate(buf, sampleRate) {
    let SIZE = buf.length;
    let MAX_SAMPLES = Math.floor(SIZE / 2);
    let best_offset = -1;
    let best_correlation = 0;
    let rms = 0;
    let foundGoodCorrelation = false;
    let correlations = [MAX_SAMPLES];

    for (let i = 0; i < SIZE; i++) {
      let val = buf[i];
      rms += val * val;
    }
    rms = Math.sqrt(rms / SIZE);
    if (rms < this.sensitivity)
      // not enough signal
      return -1;

    let lastCorrelation = 1;
    for (let offset = this.MIN_SAMPLES; offset < MAX_SAMPLES; offset++) {
      let correlation = 0;

      for (let i = 0; i < MAX_SAMPLES; i++) {
        correlation += Math.abs(buf[i] - buf[i + offset]);
      }
      correlation = 1 - correlation / MAX_SAMPLES;
      correlations[offset] = correlation; // store it, for the tweaking we need to do below.
      if (
        correlation > this.GOOD_ENOUGH_CORRELATION &&
        correlation > lastCorrelation
      ) {
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
        let shift =
          (correlations[best_offset + 1] - correlations[best_offset - 1]) /
          correlations[best_offset];
        return sampleRate / (best_offset + 8 * shift);
      }
      lastCorrelation = correlation;
    }
    if (best_correlation > this.sensitivity) {
      // console.log("f = " + sampleRate/best_offset + "Hz (rms: " + rms + " confidence: " + best_correlation + ")")
      return sampleRate / best_offset;
    }
    return -1;
    //	var best_frequency = sampleRate/best_offset;
  }

  updatePitch(time) {
    let cycles = [];
    this.analyser.getFloatTimeDomainData(this.buf);
    let ac = this.autoCorrelate(this.buf, this.audioContext.sampleRate);
    // TODO: Paint confidence meter on canvasElem here.

    if (ac == -1) {
    } else {
      let pitch = ac;
      let note = this.noteFromPitch(
        this.autoCorrelate(this.buf, this.audioContext.sampleRate)
      );

      let bufferLength = this.analyser.frequencyBinCount;
      let dataArray = new Float32Array(bufferLength);
      this.analyser.getFloatFrequencyData(dataArray);

      this.soundEventCallback[0](note, dataArray);
      let detune = this.centsOffFromPitch(pitch, note);
      if (detune == 0) {
      } else {
        //detuneAmount.innerHTML = Math.abs( detune );
      }
    }

    if (!window.requestAnimationFrame)
      window.requestAnimationFrame = window.webkitRequestAnimationFrame;
    this.rafID = window.requestAnimationFrame(this.updatePitch);
  }
}

export default SoundResponsiveFunctionGenerator;
