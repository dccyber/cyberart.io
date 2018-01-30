import React, { Component } from 'react';
import Canvas from './Engine/Canvas';
import RandomModularArithmeticAnimation from "./Animations/RandomModularArithmeticAnimation";
import MandelbrotAnimation from "./Animations/MandelbrotAnimation";
import ModularArithmeticAnimation from "./Animations/ModularArithmeticAnimation";
import GameOfLifeAnimation from "./Animations/GameOfLifeAnimation";
import BloomingGameOfLifeAnimation from "./Animations/BloomingGameOfLifeAnimation";
import BloomTrailGameOfLifeAnimation from "./Animations/BloomTrailGameOfLifeAnimation";
import SymmetricalBTGameOfLifeAnimation from "./Animations/SymmetricalBTGameOfLifeAnimation";

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

        // Don't feel like working out probabilities. They are what they are.
        this.animationList = [
            new BloomTrailGameOfLifeAnimation(this.state.height, this.state.width),
            new BloomingGameOfLifeAnimation(this.state.height, this.state.width),
            new SymmetricalBTGameOfLifeAnimation(this.state.height, this.state.width),
            new SymmetricalBTGameOfLifeAnimation(this.state.height, this.state.width),
            new GameOfLifeAnimation(this.state.height, this.state.width),
            new MandelbrotAnimation(this.state.height, this.state.width),
            new MandelbrotAnimation(this.state.height, this.state.width),
            new MandelbrotAnimation(this.state.height, this.state.width),
            new ModularArithmeticAnimation(this.state.height, this.state.width),
            new RandomModularArithmeticAnimation(this.state.height, this.state.width),
            new RandomModularArithmeticAnimation(this.state.height, this.state.width),
            new RandomModularArithmeticAnimation(this.state.height, this.state.width),
            new RandomModularArithmeticAnimation(this.state.height, this.state.width),
            new RandomModularArithmeticAnimation(this.state.height, this.state.width),
        ];

        this.animation = this.animationList[Math.floor(Math.random()*this.animationList.length)];
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

        // TODO: pass stopAnimation/animate as props to canvas, so that it can start/stop drawing if desired

        return (
            <Canvas ref={(c) => this._canvas = c}
                    width={this.state.width}
                    height={this.state.height}
                    animation={this.animation}
            />
        );
    }
}

export default ArtBox;
