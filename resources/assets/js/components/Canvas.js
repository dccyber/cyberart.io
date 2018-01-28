import React, {Component} from 'react';

class Canvas extends Component {

    constructor (props) {
        super(props);
        this.iterate = this.iterate.bind(this);
        this.redraw = this.redraw.bind(this);

        this.stateMachine = props.stateMachine || [[]];
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

    getColorForCellState (cellState) {
        return {
            red: 3 + cellState % 252,
            green: 7 + cellState % 248,
            blue: 11 + cellState % 244,
            alpha: 255
        };
    }

    iterate () {

        // Move state machine to the next state
        this.stateMachine.performStateTransition();

        for ( let i = 0; i < this.props.height; i++ ) {
            for ( let j = 0; j < this.props.width; j++ ) {
                // Calculate color for cell
                const rgba = this.stateMachine.generateColor(i, j);

                // Draw color for cell
                this.paintPixel(i, j, rgba);
            }
        }
    };

    paintPixel(x, y, rgba) {
        //TODO: explanation
        const imageData = this.g;
        const idx = 4 * (x + y * this.props.width);
        const {red, green, blue, alpha} = rgba;

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