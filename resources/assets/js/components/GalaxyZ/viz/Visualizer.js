import React, { Component } from "react";
import PolygonCanvas from "./PolygonCanvas";
import AnimationManager from "./AnimationManager";
import {getClientDimensions} from "./WindowLib";
import ScreenModes from "./ScreenModes";

const DEFAULT_WIDTH = 1662;
const DEFAULT_HEIGHT = 1662;

const getInitialStateFromProps = (props) => {
    let width, height;
    if (props.mode === ScreenModes.FULLSCREEN) {
        ({ width, height } = getClientDimensions());
        if (props.shrinkHeight) {
            height -= props.shrinkHeight;
        }
    } else {
        width = DEFAULT_WIDTH;
        height = DEFAULT_HEIGHT;
    }

    return {
        width, height
    }
};

class Visualizer extends Component {

    state = getInitialStateFromProps(this.props);

    constructor(props) {
        super(props);
        this.animationManager = new AnimationManager(this.props.animations, this.changeAnimation);
    }

    componentDidMount() {
        this.animationManager.refreshAnimation();
    }

    render() {

        const {animation, width, height} = this.state;

        if (!animation) return null;

        return (
            <PolygonCanvas
                width={width}
                height={height}
                animation={animation}
                beginAnimation={this.animationManager.animate}
                persistent={true}
            />
        );
    }

    changeAnimation = Animation => {
        const animation = new Animation(this.state.height, this.state.width);
        this.setState({animation});
    };
}

export default Visualizer;
