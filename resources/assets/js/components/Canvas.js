import React, {Component} from 'react';

class Canvas extends Component {

    constructor (props) {
        super(props);
        this.iterate = this.iterate.bind(this);
        this.redraw = this.redraw.bind(this);

        this.animationState = props.initialState || [];
    }

    componentDidMount() {
        this.ctx = this.refs.canvas.getContext('2d');
        this.imageData = this.ctx.createImageData( this.props.width, this.props.height );
        this.g  = this.imageData.data;
    }

    redraw(){
        this.iterate();

        //Used for drawing raw pixels in the buffer
        this.ctx.putImageData(this.imageData, 0, 0);
    }

    iterate () {
        for ( let i = 0; i < this.props.height; i++ ) {
            for ( let j = 0; j < this.props.width; j++ ) {
                this.animationState[i][j]+=10;
                this.paintPixel (i, j);
            }
        }
    };


    paintPixel (i, j) {
        const pixelValue = this.animationState[i][j];

        const red = pixelValue % 255;
        const green = pixelValue % 255;
        const blue = 0;

        this.literalPaintPixel(i, j, red, green, blue);
    }

    literalPaintPixel(x, y, red, green, blue, alpha = 255) {
        let imageData = this.g;

        //TODO: explanation
        const idx = 4 * (x + y * this.props.width);

        imageData[idx] = red;
        imageData[1 + idx] = green;
        imageData[2 + idx] = blue;
        imageData[3 + idx] = alpha;
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