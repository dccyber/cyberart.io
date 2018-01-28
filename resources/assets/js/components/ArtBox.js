import React, { Component } from 'react';
import Canvas from './Canvas';

const FPS = 60;

class ArtBox extends Component {

    constructor () {
        super();

        this.state = {
            width: 375,
            height: 375
        };

        this.counter = 0;
        this.drawLoopInterval = Math.floor(1000/FPS);
        this.redrawNecessary = true;

        this.drawLoop = this.drawLoop.bind(this);
        this.draw = this.draw.bind(this);
        this.requestRedraw = this.requestRedraw.bind(this);
        this.initializePixelBuffer = this.initializePixelBuffer.bind(this);
    }

    componentWillMount(){
        this.initializePixelBuffer();
    }

    componentDidMount(){
        this.drawLoop();
    }

    initializePixelBuffer () {
        this.setState({
            drawBuffer: []
        });
    }

    drawLoop () {

        if (this.redrawNecessary) {
            this.draw();
        }

        setTimeout(this.drawLoop, this.drawLoopInterval);
    }

    draw () {
        // Clean out the buffer
        this.initializePixelBuffer();

        // Redraw the canvas using the buffer
        this._canvas.redraw(this.state.drawBuffer);
    }



    requestRedraw () {
        this.redrawNecessary = true;
    }

    render() {
        return (
            <Canvas ref={(c) => this._canvas = c}
                    width={this.state.width}
                    height={this.state.height}
            />
        );
    }
}

export default ArtBox;
