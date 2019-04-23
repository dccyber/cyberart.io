import React, { Component } from "react";

/**
 * Copyright Aaron Boyarsky, 2018
 */
class ImageCanvas extends Component {
  constructor(props) {
    super(props);
    this.iterate = this.iterate.bind(this);
    this.redraw = this.redraw.bind(this);
  }

  componentDidMount() {
    this.ctx = this.refs.canvas.getContext("2d");
    this.imageData = this.ctx.createImageData(
      this.props.width,
      this.props.height
    );
    this.g = this.imageData.data;

    this.ctx.putImageData(this.imageData, 0, 0);

    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(0, 0, this.props.width, this.props.height);

    const image = new Image();
    image.src = "/img/coolpic.jpg";
    let self = this;

    image.onload = () => {
      self.ctx.drawImage(image, 0, 0, self.props.width, self.props.height);
    };
  }

  redraw() {
    this.iterate();

    //Used for drawing raw pixels in the buffer
  }

  iterate() {
    //var p = this.ctx.getImageData(30, 40, 1, 1).data;
    //console.log(p);
    let p = this.ctx.getImageData(0, 0, this.props.width, this.props.height);
    let pdata = p.data;
    let index = 0;
    for (let x = 0; x < this.props.width; x++) {
      for (let y = 0; y < this.props.height; y++) {
        pdata[index] = Math.min(
          pdata[index] + (1 / (x % 5)) * Math.random(),
          255
        );
        if (pdata[index] >= 255) {
          pdata[index] -= 255;
        }

        pdata[index + 1] = Math.min(
          pdata[index + 1] + (1 / 37) * Math.random(),
          255
        );
        if (pdata[index + 1] >= 255) {
          pdata[index + 1] -= 255;
        }

        pdata[index + 2] = Math.min(
          pdata[index + 2] + (1 / (y % 71)) * Math.random(),
          255
        );
        if (pdata[index + 2] >= 255) {
          pdata[index + 2] -= 255;
        }
        /*
                pdata[index + 3] =  Math.min((pdata[index + 3] + 7), 255);
                if (pdata[index+3] >= 255) {
                    pdata[index + 3] -= 255;
                }
                */
        index += 4;
      }
    }

    this.ctx.putImageData(p, 0, 0);

    // Advance animation to the next frame
    //this.props.animation.moveToNextFrame();

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
        <h5 style={{ margin: "5px" }}>{this.props.animation.title}</h5>
        {this.props.animation.render ? this.props.animation.render() : null}
        <canvas
          id="canvas"
          ref="canvas"
          width={this.props.width}
          height={this.props.height}
        />
      </React.Fragment>
    );
  }
}

export default ImageCanvas;
