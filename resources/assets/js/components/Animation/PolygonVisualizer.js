import React, { Component } from 'react';
import Canvas from './Engine/Canvas';
import BasicSoundResponsiveAnimation from "./Animations/StateMachine/SoundResponsive/BasicSoundResponsiveAnimation";
import PolygonCanvas from "./Engine/PolygonCanvas";
import SoundCircle from "./Animations/Polygon/SoundCircle";
import SoundCircleCircle from "./Animations/Polygon/SoundCircleCircle";
import SquareSpiral from "./Animations/Polygon/SquareSpiral";
import PoppingSquares from "./Animations/Polygon/PoppingSquares";
import PoppingSquares2 from "./Animations/Polygon/PoppingSquares2";
import RectEqualizer from "./Animations/Polygon/RectEqualizer";
import SoundTriangle from "./Animations/Polygon/SoundTriangle";
import Visualizer from "./Visualizer";

const VISUALIZER_WIDTH = 1684;
const VISUALIZER_HEIGHT = 1684;


class PolygonVisualizer extends Visualizer {

    constructor () {
        super();

        this.state = {
            width:VISUALIZER_WIDTH,
            height: VISUALIZER_HEIGHT
        };



        // Don't feel like working out probabilities. They are what they are.
        this.animationList = [
                        SoundCircle,
                        SoundCircleCircle,
                        SquareSpiral,
                        //PoppingSquares,
                        PoppingSquares2,

            RectEqualizer
        ];

    }




    render() {
        // TODO: pass stopAnimation/animate as props to canvas, so that it can start/stop drawing if desired

        return (
            <React.Fragment>
                <button style={{marginBottom: '5px', marginTop: '5px'}} onClick={this.setRandomAnimation}>Randomize</button>
                <PolygonCanvas ref={(c) => this._canvas = c}
                               width={this.state.width}
                               height={this.state.height}
                               animation={this.state.animation}
                />
            </React.Fragment>

        );
    }
}

export default PolygonVisualizer;
