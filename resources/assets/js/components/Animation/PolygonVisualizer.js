import React, { Component } from 'react';
import Canvas from './Engine/Canvas';
import BasicSoundResponsiveAnimation from "./Animations/StateMachine/SoundResponsive/BasicSoundResponsiveAnimation";
import PolygonCanvas from "./Engine/PolygonCanvas";
import SoundCircle from "./Animations/Polygon/SoundCircle";
import SoundCircleCircle from "./Animations/Polygon/SoundCircleCircle";

const FPS = 120;
const LIMIT_FRAMERATE = false;

const VISUALIZER_WIDTH = 1684;
const VISUALIZER_HEIGHT = 1684;


class PolygonVisualizer extends Component {

    constructor () {
        super();

        this.state = {
            width:VISUALIZER_WIDTH,
            height: VISUALIZER_HEIGHT
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
            SoundCircle,
            SoundCircleCircle
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
        this.setState({
            animation: new ChosenAnimation(this.state.width, this.state.height)
        });
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
                <button style={{marginBottom: '5px', marginTop: '5px'}} onClick={this.setRandomAnimation}>Randomize</button>
                <PolygonCanvas ref={(c) => this._canvas = c}
                        width={this.state.width}
                        height={this.state.height}
                        animation={this.state.animation}
                />
            </div>

        );
    }
}

export default PolygonVisualizer;
