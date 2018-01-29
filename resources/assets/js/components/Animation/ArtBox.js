import React, { Component } from 'react';
import Canvas from './Engine/Canvas';
import TwoDimensionalStateMachine from './Engine/TwoDimensionalStateMachine';
import ModularArithmeticAnimation from "./Animations/ModularArithmeticAnimation";

const FPS = 120;
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

        let animation = new ModularArithmeticAnimation(this.state.height, this.state.width);
        // TODO: pass stopAnimation/animate as props to canvas, so that it can start/stop drawing if desired

        return (
            <Canvas ref={(c) => this._canvas = c}
                    width={this.state.width}
                    height={this.state.height}
                    animation={animation}
            />
        );
    }
}

export default ArtBox;
