import React, { Component } from 'react';
import Canvas from './Engine/Canvas';
import BasicSoundResponsiveAnimation from './Animations/StateMachine/SoundResponsive/BasicSoundResponsiveAnimation';
import PolygonCanvas from './Engine/PolygonCanvas';
import SoundCircle from './Animations/Polygon/SoundCircle';
import SoundCircleCircle from './Animations/Polygon/SoundCircleCircle';
import SquareSpiral from './Animations/Polygon/SquareSpiral';
import PoppingSquares from './Animations/Polygon/PoppingSquares';
import PoppingSquares2 from './Animations/Polygon/PoppingSquares2';
import RectEqualizer from './Animations/Polygon/RectEqualizer';
import SoundTriangle from './Animations/Polygon/SoundTriangle';
import Visualizer from './Visualizer';
import PoppingSquares3 from './Animations/Polygon/PoppingSquares3';

const VISUALIZER_WIDTH = 1662;
const VISUALIZER_HEIGHT = 1662;

class PolygonVisualizer extends Visualizer {
    constructor() {
        super();

        this.state = {
            width: VISUALIZER_WIDTH,
            height: VISUALIZER_HEIGHT,
            animationStarted: false
        };

        // Don't feel like working out probabilities. They are what they are.
        this.animationList = [
            SoundCircle,
            SoundCircleCircle,
            SquareSpiral,
            PoppingSquares,
            PoppingSquares2,
            RectEqualizer
        ];

        this.beginAnimation = this.beginAnimation.bind(this);
    }

    beginAnimation() {
        this.chosenAnimationIdx = Math.floor(Math.random() * this.animationList.length);
        const ChosenAnimation = this.animationList[this.chosenAnimationIdx];
        this.state.animation = new ChosenAnimation(this.state.width, this.state.height);

        this.setState(
            {
                animationStarted: true
            },
            super.beginAnimation
        );
    }

    render() {
        // TODO: pass stopAnimation/animate as props to canvas, so that it can start/stop drawing if desired

        return (
            <React.Fragment>
                {this.state.animationStarted ? (
                    <React.Fragment>
                        {super.render()}
                        <PolygonCanvas
                            ref={c => (this._canvas = c)}
                            width={this.state.width}
                            height={this.state.height}
                            animation={this.state.animation}
                        />
                    </React.Fragment>
                ) : (
                    <button onClick={this.beginAnimation}>Start Animation</button>
                )}
            </React.Fragment>
        );
    }
}

export default PolygonVisualizer;
