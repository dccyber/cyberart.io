import React, { Component } from 'react';

/**
 * Copyright Aaron Boyarsky, 2018
 */
class InterfaceCanvas extends Component {
    constructor(props) {
        super(props);
        this.iterate = this.iterate.bind(this);
        this.redraw = this.redraw.bind(this);
    }

    componentDidMount() {
        this.ctx = this.refs.canvas.getContext('2d');
        this.imageData = this.ctx.createImageData(this.props.width, this.props.height);
        this.g = this.imageData.data;

        this.ctx.putImageData(this.imageData, 0, 0);

        this.ctx.fillStyle = '#555555';
        this.ctx.fillRect(0, 0, this.props.width, this.props.height);

        let self = this;
        this.refs.canvas.addEventListener('click', function(e) {
            let MouseX = e.pageX - this.offsetLeft;
            let MouseY = e.pageY - this.offsetTop;

            self.handleMouseClick(MouseX, MouseY);
        });

        /*
        const image = new Image();
        image.src = "/img/coolpic.jpg";
        let self=this;

        image.onload = () => {
            self.ctx.drawImage(image, 0, 0, self.props.width, self.props.height);
        };
        */
    }

    redraw() {
        this.iterate();

        //Used for drawing raw pixels in the buffer
    }

    handleMouseClick(x, y) {
        console.log(x, y);

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

        //this.ctx.fillStyle="#BBBBBB";

        const windowWidth = this.props.width * 0.8;
        const windowHeight = this.props.height * 0.8;

        const left = (this.props.width - windowWidth) / 2;
        const top = (this.props.height - windowHeight) / 2;
        /*
        this.ctx.fillRect(
            left,
            top,
            windowWidth,
            windowHeight
        );
        */

        //now a button
        /*
        this.ctx.fillStyle="#FF0000";
        const buttonWidth = 100;
        const buttonHeight = 40;

        const buttonLeft = left + 20;
        const buttonTop = top + 20;

        this.ctx.fillRect(
            buttonLeft,
            buttonTop,
            buttonWidth,
            buttonHeight
        );
        */

        /*
        this.buttons = [
            {
                id: 1,
                width: buttonWidth,
                height: buttonHeight,
                left: buttonLeft,
                top: buttonTop
            }
        ];
        */

        // Advance animation to the next frame
        this.props.animation.moveToNextFrame(this.ctx);

        // TODO: draw the objects in the animation
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
