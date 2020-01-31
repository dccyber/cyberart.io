import React, { Component } from "react";

/**
 * Copyright Aaron Boyarsky, 2018
 */
class PolygonCanvas extends Component {
    componentDidMount() {
        this.ctx = this.refs.canvas.getContext("2d");
        this.imageData = this.ctx.createImageData(this.props.width, this.props.height);
        this.g = this.imageData.data;

        this.ctx.putImageData(this.imageData, 0, 0);

        this.props.beginAnimation(this.redraw);
    }

    redraw = () => {
        this.iterate();

        //Used for drawing raw pixels in the buffer
    };

    iterate = () => {
        if (!this.props.persistent) {
            this.ctx.fillStyle = "#000000";
            this.ctx.fillRect(0, 0, this.props.width, this.props.height);
        }


        // Advance animation to the next frame
        this.props.animation.moveToNextFrame();

        // TODO: draw the objects in the animation

        /*
        ctx.draw(
            image,
            x,
            y - objectHeight,
            objectWidth,
            objectHeight
        );
        */

        // smaller circles on top
        let polygonsCopy = [...this.props.animation.polygons];
        polygonsCopy.sort(function(a, b) {
            if (a[a.sortable] < b[b.sortable]) {
                return a.sortOrder;
            }

            if (a[a.sortable] > b[b.sortable]) {
                return -1 * a.sortOrder;
            }

            return 0;
        });

        polygonsCopy.forEach(polygon => {
            polygon.draw(this.ctx, this.props.animation.framesElapsed);
        });

        /*
        const { ctx } = this;
        ctx.font        = "normal 36px Arial";
        ctx.fillStyle = "#00FF00";
        ctx.fillText("Moving", 50 + this.props.animation.framesElapsed, 90);
        */

        /*
        let x = 50;
        let y = 50;
        let height = 10;
        let startAngle = 0;
        let endAngle = Math.PI * 2;
        let anticlockwise = false;
        this.ctx.fillStyle="#FF0000";
        this.ctx.beginPath();
        this.ctx.arc(x, y, height, startAngle, endAngle, anticlockwise);
        this.ctx.fill();
        */
    };


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
                <h5 style={{ margin: "5px" }}>{this.props.animation.title}</h5>
                {this.props.animation.render ? this.props.animation.render() : null}

                <canvas id="canvas" ref="canvas" width={this.props.width} height={this.props.height} />
            </React.Fragment>
        );
    }
}

export default PolygonCanvas;
