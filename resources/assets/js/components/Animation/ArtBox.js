import React, { Component } from 'react';
import Canvas from './Engine/Canvas';
import RandomModularArithmeticAnimation from "./Animations/ModularArithmetic/RandomModularArithmeticAnimation";
import MandelbrotAnimation from "./Animations/Fractals/Mandelbrot/MandelbrotAnimation";
import ModularArithmeticAnimation from "./Animations/ModularArithmetic/ModularArithmeticAnimation";
import BloomingGameOfLifeAnimation from "./Animations/CellularAutomata/GameOfLife/BloomingGameOfLifeAnimation";
import SymmetricalBTGameOfLifeAnimation from "./Animations/CellularAutomata/GameOfLife/SymmetricalBTGameOfLifeAnimation";
import SymmetricalBTGameOfLifeAnimationB from "./Animations/CellularAutomata/GameOfLife/SymmetricalBTGameOfLifeAnimationB";
import MandelbrotAnimationZoom from "./Animations/Fractals/Mandelbrot/MandelbrotAnimationZoom";

const FPS = 120;
const LIMIT_FRAMERATE = false;

class ArtBox extends Component {

    constructor () {
        super();

        const size = 375;

        this.state = {
            width:375,
            height: size
        };

        this.counter = 0;
        this.drawLoopInterval = Math.floor(1000/FPS);

        this.drawLoop = this.drawLoop.bind(this);
        this.animate = this.animate.bind(this);
        this.stopAnimation = this.stopAnimation.bind(this);
        this.setRandomAnimation = this.setRandomAnimation.bind(this);

    }

    componentWillMount () {
        this.registerVendorAnimationFunctions();

        // Don't feel like working out probabilities. They are what they are.
        this.animationList = [
            BloomingGameOfLifeAnimation,
            ////BloomTrailGameOfLifeAnimation,
            SymmetricalBTGameOfLifeAnimation,
            SymmetricalBTGameOfLifeAnimationB,
            ////GameOfLifeAnimation,
            MandelbrotAnimation,
            MandelbrotAnimationZoom,
            ModularArithmeticAnimation,
            RandomModularArithmeticAnimation,
        ];

        this.chosenAnimationIdx = Math.floor(Math.random()*this.animationList.length);
        const ChosenAnimation = this.animationList[this.chosenAnimationIdx];
        this.state.animation = new ChosenAnimation(this.state.width, this.state.height );
    }


    componentDidMount(){
        this.animate();
    }

    setRandomAnimation () {
        this.stopAnimation();

        const oldAnimationIdx = this.chosenAnimationIdx;

        // Ensure a different animatino
        while (oldAnimationIdx === this.chosenAnimationIdx) {
            this.chosenAnimationIdx = Math.floor(Math.random()*this.animationList.length);
        }

        const ChosenAnimation = this.animationList[this.chosenAnimationIdx];
        this.state.animation = null;
        this.setState({animation: new ChosenAnimation(this.state.width, this.state.height) });
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
            <div>

                <Canvas ref={(c) => this._canvas = c}
                        width={this.state.width}
                        height={this.state.height}
                        animation={this.state.animation}
                        changeAnimation={this.setRandomAnimation}
                />
            </div>

        );
    }
}

export default ArtBox;
