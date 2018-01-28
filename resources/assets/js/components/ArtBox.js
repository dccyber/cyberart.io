import React, { Component } from 'react';
import Canvas from './Canvas';

const FPS = 10;
const LIMIT_FRAMERATE = false;

class ArtBox extends Component {

    constructor () {
        super();

        this.state = {
            width: 375,
            height: 375
        };

        this.counter = 0;
        this.drawLoopInterval = Math.floor(1000/FPS);

        this.drawLoop = this.drawLoop.bind(this);
        this.animate = this.animate.bind(this);
        this.stopAnimation = this.stopAnimation.bind(this);
    }


    componentDidMount(){
        this.registerVendorAnimationFunctions();
        this.animate();
    }

    // TODO: would be good in a utility somewhere
    registerVendorAnimationFunctions () {
        const vendors = ['ms', 'moz', 'webkit', 'o'];
        for(let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                || window[vendors[x]+'CancelRequestAnimationFrame'];
        }
    }

    drawLoop () {
        // Redraw the canvas using the buffer
        this._canvas.redraw();

        if (LIMIT_FRAMERATE) {
            setTimeout(this.animate, this.drawLoopInterval);
        } else {
            this.animate();
        }

    }

    animate () {
        this.animationId = requestAnimationFrame(this.drawLoop);
    }

    stopAnimation () {
        cancelAnimationFrame(this.animationId);
    }

    render() {

        // Set starting conditions
        let initialState = [];
        for ( let i = 0; i < this.state.height; i++ ) {
            initialState[i] = [];
            for ( let j = 0; j < this.state.width; j++ ) {
                initialState[i][j] = i+j;
            }
        }

        // TODO: pass stopAnimation/animate as props to canvas, so that it can start/stop drawing if desired

        return (
            <Canvas ref={(c) => this._canvas = c}
                    width={this.state.width}
                    height={this.state.height}
                    initialState={initialState}
            />
        );
    }
}

export default ArtBox;
