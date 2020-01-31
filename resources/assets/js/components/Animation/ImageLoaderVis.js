import React, { Component } from 'react';
import InterfaceCanvas from './Engine/InterfaceCanvas'; //TODO: replace with imageCanvas
import Visualizer from './Visualizer';
import InterfaceAnimation from './Animations/InterfaceAnimation';

const BLOCK_WIDTH = 5;
const BLOCK_COUNT = 199;
const VISUALIZER_WIDTH = 1024;
const VISUALIZER_HEIGHT = 768;

class ImageLoaderVisualizer extends Visualizer {
    constructor() {
        super();

        this.state = {
            width: VISUALIZER_WIDTH,
            height: VISUALIZER_HEIGHT
        };

        // Don't feel like working out probabilities. They are what they are.
        this.animationList = [InterfaceAnimation];
    }

    render() {
        // TODO: pass stopAnimation/animate as props to canvas, so that it can start/stop drawing if desired

        return (
            <React.Fragment>
                {super.render()}
                <InterfaceCanvas
                    ref={c => (this._canvas = c)}
                    width={this.state.width}
                    height={this.state.height}
                    animation={this.state.animation}
                />
            </React.Fragment>
        );
    }
}

export default ImageLoaderVisualizer;
