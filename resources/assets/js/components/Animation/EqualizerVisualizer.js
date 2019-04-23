import React, { Component } from "react";
import Canvas from "./Engine/Canvas";
import BasicSoundResponsiveAnimation from "./Animations/StateMachine/SoundResponsive/BasicSoundResponsiveAnimation";
import Visualizer from "./Visualizer";

const VISUALIZER_WIDTH = 512;
const VISUALIZER_HEIGHT = 250;

class EqualizerVisualizer extends Visualizer {
  constructor() {
    super();

    this.state = {
      width: VISUALIZER_WIDTH,
      height: VISUALIZER_HEIGHT
    };

    this.animationList = [BasicSoundResponsiveAnimation];
  }

  render() {
    // TODO: pass stopAnimation/animate as props to canvas, so that it can start/stop drawing if desired

    return (
      <div>
        <Canvas
          ref={c => (this._canvas = c)}
          width={this.state.width}
          height={this.state.height}
          animation={this.state.animation}
        />
      </div>
    );
  }
}

export default EqualizerVisualizer;
