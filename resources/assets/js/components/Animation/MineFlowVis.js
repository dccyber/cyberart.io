import React, { Component } from "react";
import PolygonCanvas from "./Engine/PolygonCanvas";
import FlowA from "./Animations/MineFlow/FlowA";
import Visualizer from "./Visualizer";

const BLOCK_WIDTH = 5;
const BLOCK_COUNT = 199;
const VISUALIZER_WIDTH = BLOCK_COUNT * BLOCK_WIDTH;
const VISUALIZER_HEIGHT = BLOCK_COUNT * BLOCK_WIDTH;

class PolygonVisualizer extends Visualizer {
    constructor() {
        super();

        this.state = {
            width: VISUALIZER_WIDTH,
            height: VISUALIZER_HEIGHT
        };

        // Don't feel like working out probabilities. They are what they are.
        this.animationList = [FlowA];
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
