import React, { Component } from "react";
import PolygonCanvas from "./PolygonCanvas";
import SoundCircle from "./SoundCircle";
import Visualizer from "./Visualizer";

const VISUALIZER_WIDTH = 1662;
const VISUALIZER_HEIGHT = 1662;

class PolygonVisualizer extends Visualizer {
  constructor() {
    super();

    this.state = {
      width: VISUALIZER_WIDTH,
      height: VISUALIZER_HEIGHT
    };

    // Don't feel like working out probabilities. They are what they are.
    this.animationList = [SoundCircle];
  }

  render() {
    // TODO: pass stopAnimation/animate as props to canvas, so that it can start/stop drawing if desired

    return (
      <React.Fragment>
        {super.render()}
        <PolygonCanvas
          ref={c => (this._canvas = c)}
          width={this.state.width}
          height={this.state.height}
          animation={this.state.animation}
        />
      </React.Fragment>
    );
  }
}

export default PolygonVisualizer;
