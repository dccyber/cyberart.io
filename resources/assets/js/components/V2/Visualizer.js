import React, { Component } from "react";

const DEFAULT_WIDTH = 1024;
const DEFAULT_HEIGHT = 768;
const FPS = 120;
const LIMIT_FRAMERATE = false;

class Visualizer extends Component {
  constructor() {
    super();

    this.state = {
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT
    };

    this.counter = 0;
    this.drawLoopInterval = Math.floor(1000 / FPS);
    this.animationList = [];
  }

  componentWillMount() {
    this.registerVendorAnimationFunctions();

    this.chosenAnimationIdx = Math.floor(
      Math.random() * this.animationList.length
    );
    const ChosenAnimation = this.animationList[this.chosenAnimationIdx];
    this.state.animation = new ChosenAnimation(
      this.state.width,
      this.state.height
    );
  }

  componentDidMount() {
    this.animate();
  }

  // TODO: would be good in a utility somewhere
  registerVendorAnimationFunctions = () => {
    const vendors = ["ms", "moz", "webkit", "o"];
    for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame =
        window[vendors[x] + "RequestAnimationFrame"];
      window.cancelAnimationFrame =
        window[vendors[x] + "CancelAnimationFrame"] ||
        window[vendors[x] + "CancelRequestAnimationFrame"];
    }
  };

  setRandomAnimation = () => {
    if (this.animationList.length > 1) {
      console.log(this.animationList.length);

      this.stopAnimation();

      const oldAnimationIdx = this.chosenAnimationIdx;

      // Ensure a different animatino
      while (oldAnimationIdx === this.chosenAnimationIdx) {
        this.chosenAnimationIdx = Math.floor(
          Math.random() * this.animationList.length
        );
      }

      const ChosenAnimation = this.animationList[this.chosenAnimationIdx];
      this.state.animation.soundGenerator = null;
      this.state.animation = null;
      this.setState({
        animation: new ChosenAnimation(this.state.width, this.state.height)
      });
      this.animate();
    }
  };

  drawLoop = () => {
    // Redraw the canvas using the buffer
    this._canvas.redraw();

    if (LIMIT_FRAMERATE) {
      setTimeout(this.animate, this.drawLoopInterval);
    } else {
      this.animate();
    }
  };

  animate = () => {
    this.animationId = requestAnimationFrame(this.drawLoop);
  };

  stopAnimation = () => {
    cancelAnimationFrame(this.animationId);
  };

  render() {
    return (
      <React.Fragment>
        <div>Visualizer</div>
      </React.Fragment>
    );
  }
}

export default Visualizer;
