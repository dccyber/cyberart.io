import React, { Component } from 'react';

/**
 * Copyright Aaron Boyarsky, 2018
 */
class InterfaceCanvas extends Component {
    constructor(props) {
        super(props);
        this.iterate = this.iterate.bind(this);
        this.redraw = this.redraw.bind(this);
        this.adjustPixel = this.adjustPixel.bind(this);
    }

    componentDidMount() {
        this.ctx = this.refs.canvas.getContext('2d');
        this.imageData = this.ctx.createImageData(this.props.width, this.props.height);
        this.g = this.imageData.data;

        this.ctx.putImageData(this.imageData, 0, 0);

        this.ctx.fillStyle = '#555555';
        this.ctx.fillRect(0, 0, this.props.width, this.props.height);

        let self = this;
        this.refs.canvas.addEventListener('mousedown', function(e) {
            let MouseX = e.pageX - this.offsetLeft;
            let MouseY = e.pageY - this.offsetTop;

            self.handleMouseDown(MouseX, MouseY);
        });

        this.refs.canvas.addEventListener('click', function(e) {
            let MouseX = e.pageX - this.offsetLeft;
            let MouseY = e.pageY - this.offsetTop;

            self.handleMouseClick(MouseX, MouseY);
        });

        this.backgroundImage = new Image();
        this.backgroundImage.src = '/img/coolpic.jpg';

        this.backgroundImage.onload = () => {
            self.ctx.drawImage(this.backgroundImage, 0, 0, self.props.width, self.props.height);
            this.imageData = this.ctx.getImageData(0, 0, this.props.width, this.props.height);
            this.g = this.imageData.data;
        };
    }

    redraw() {
        this.iterate();

        //Used for drawing raw pixels in the buffer
    }

    handleMouseDown(x, y) {
        this.props.animation.handleMouseDown(x, y);
    }

    handleMouseClick(x, y) {
        console.log(x, y);

        this.props.animation.handleMouseClick(x, y);

        /*
        const {id, width, height, left, top} = this.buttons[0];

        if (
            x >= left && x <= left + width &&
            y >= top && y <= top + height
        ) {
            alert('clicked button id: ' + 1);
        }
        */
    }

    iterate() {
        // Render a window background

        //this.ctx.drawImage(this.backgroundImage, 0, 0, self.props.width, self.props.height);

        // TODO: draw the objects in the animation

        for (let a = 0; a < this.props.width; a++) {
            for (let b = 0; b < this.props.height; b++)
                //this.adjustPixel(a, 2);
                this.adjustPixel(a, b);
        }

        this.ctx.putImageData(this.imageData, 0, 0);

        // Advance animation to the next frame
        this.props.animation.moveToNextFrame(this.ctx);
    }

    adjustPixel(x, y) {
        const imageData = this.g;
        const idx = 4 * (x + y * this.props.width);

        imageData[idx] = (imageData[idx] + 2) % 255;
        imageData[1 + idx] = (imageData[1 + idx] + 3) % 255;
        imageData[2 + idx] = (imageData[2 + idx] + 5) % 255;
        imageData[3 + idx] = 255;
    }

    paintPixel(x, y, rgba) {
        //TODO: explanation
        const imageData = this.g;
        const idx = 4 * (x + y * this.props.width);
        const { red, green, blue, alpha } = rgba;

        imageData[idx] = red;
        imageData[1 + idx] = green;
        imageData[2 + idx] = blue;
        imageData[3 + idx] = alpha;
    }

    render() {
        return (
            <React.Fragment>
                <h5 style={{ margin: '5px' }}>{this.props.animation.title}</h5>
                {this.props.animation.render ? this.props.animation.render() : null}
                <canvas id="canvas" ref="canvas" width={this.props.width} height={this.props.height} />
            </React.Fragment>
        );
    }
}

export default InterfaceCanvas;
