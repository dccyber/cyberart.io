import React, { Component } from "react";
import PolygonCanvas from "./PolygonCanvas";
import SoundCircle from "./SoundCircle";
import RenderLib from "./util/RenderLib";
import AnimationManager from "./util/AnimationManager";

const DEFAULT_WIDTH = 1662;
const DEFAULT_HEIGHT = 1662;

class Visualizer extends Component {
    constructor(props) {
        super(props);

        this.animationManager = new AnimationManager([SoundCircle], this.changeAnimation);

        const ChosenAnimation = this.animationManager.getCurrentAnimation();

        this.state = {
            width: DEFAULT_WIDTH,
            height: DEFAULT_HEIGHT,
            animation: new ChosenAnimation(DEFAULT_WIDTH, DEFAULT_HEIGHT)
        };

        this.counter = 0;

        RenderLib.registerVendorAnimationFunctions();
    }

    changeAnimation(Animation) {
        const animation = new Animation(this.state.width, this.state.height);
        this.setState({
            animation
        });
    }

    componentDidMount() {
        this.animationManager.animate(this._canvas.redraw);
    }

    render() {
        return (
            <PolygonCanvas
                ref={c => (this._canvas = c)}
                width={this.state.width}
                height={this.state.height}
                animation={this.state.animation}
            />
        );
    }
}

export default Visualizer;
