import React, { Component } from 'react';

const DEFAULT_WIDTH = 500;
const DEFAULT_HEIGHT = 500;
const FPS = 120;
const LIMIT_FRAMERATE = false;

class Visualizer extends Component {

    constructor () {
        super();

        this.state = {
            width: DEFAULT_WIDTH,
            height: DEFAULT_HEIGHT
        };

        this.counter = 0;
        this.drawLoopInterval = Math.floor(1000/FPS);


        this.drawLoop = this.drawLoop.bind(this);
        this.animate = this.animate.bind(this);
        this.stopAnimation = this.stopAnimation.bind(this);
        this.setRandomAnimation = this.setRandomAnimation.bind(this);

        this.animationList = [];
    }

    componentWillMount () {
        this.registerVendorAnimationFunctions();

        this.chosenAnimationIdx = Math.floor(Math.random()*this.animationList.length);
        const ChosenAnimation = this.animationList[this.chosenAnimationIdx];
        this.state.animation = new ChosenAnimation(this.state.width, this.state.height );
    }

    componentDidMount(){
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

    setRandomAnimation () {
        this.stopAnimation();

        const oldAnimationIdx = this.chosenAnimationIdx;

        // Ensure a different animatino
        while (oldAnimationIdx === this.chosenAnimationIdx) {
            this.chosenAnimationIdx = Math.floor(Math.random()*this.animationList.length);
        }

        const ChosenAnimation = this.animationList[this.chosenAnimationIdx];
        this.state.animation.soundGenerator = null;
        this.state.animation = null;
        this.setState({
            animation: new ChosenAnimation(this.state.width, this.state.height)
        });
        this.animate();
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

    render () {
        return (
            <div>
                { super.render() }
            </div>
        )
    }
}

export default Visualizer;