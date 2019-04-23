import React, { Component } from "react";
import Slider from "@material-ui/core/Slide";

const style = {
  position: "absolute",
  left: 50,
  top: 50,
  width: "300px"
};

class Sliders extends Component {
  constructor() {
    super();

    this.sliders = [];

    for (let a = 0; a < 10; a++) {
      this.sliders[a] = 0.5;
    }
  }

  render() {
    return (
      <div style={style}>
        {this.sliders.map((defaultVal, sliderIdx) => {
          return (
            <Slide
              key={sliderIdx}
              defaultValue={defaultVal}
              onChange={(event, newValue) =>
                this.props.setAnimationParameter(sliderIdx, newValue)
              }
            />
          );
        })}
      </div>
    );
  }
}

export default Sliders;
