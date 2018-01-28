import React, {Component} from 'react';

class Canvas extends Component {
    constructor () {
        super();
        this.updateCanvas = this.updateCanvas.bind(this);
        this.iterate = this.iterate.bind(this);
        this.redraw = this.redraw.bind(this);

        this.drawBuffer = [];
    }

    componentDidMount() {
        this.ctx = this.refs.canvas.getContext('2d');
        this.imageData = this.ctx.createImageData( this.props.width, this.props.height );
        this.g  = this.imageData.data;

        const vendors = ['ms', 'moz', 'webkit', 'o'];
        for(let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                || window[vendors[x]+'CancelRequestAnimationFrame'];
        }

        for ( let i = 0; i < this.props.height; i++ ) {
            this.drawBuffer[i] = [];
            for ( let j = 0; j < this.props.width; j++ ) {
                this.drawBuffer[i][j] = i+j;
            }
        }

        for ( let i = 0; i < this.props.height; i++ ) {
            for ( let j = 0; j < this.props.width; j++ ) {
                this.paintPixel (i, j);
            }
        }
    }

    componentWillReceiveProps() {
    }

    updateCanvas() {
        requestAnimationFrame(this.iterate);
    }

    redraw(repaintedPixels){
        this.drawBuffer = repaintedPixels;
        this.updateCanvas();
    }

    iterate () {
        //Used for drawing raw pixels in the buffer
        this.ctx.putImageData(this.imageData, 0, 0);

        /*this.drawBuffer.map(instruction => {
           instruction(this.ctx);
        });*/

        for ( let i = 0; i < this.props.height; i++ ) {
            for ( let j = 0; j < this.props.width; j++ ) {
                this.paintPixel (i, j);
            }
        }
    };


    paintPixel (i, j) {

        const pixelValue = this.drawBuffer[i][j];

        let g = this.g;
        const idx = 4 * (j + i * this.props.width);
        g[idx] = pixelValue % 255; //R
        g[1 + idx] = pixelValue % 255;//G
        g[2 + idx] = 0;//B
        g[3 + idx] = 255;
    }

    render() {
        return (
            <canvas
                id="canvas"
                ref="canvas"
                width={this.props.width}
                height={this.props.height}
            />
        );
    }
}

export default Canvas;