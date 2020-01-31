import React, { Component } from 'react';
import PolygonCanvas from './PolygonCanvas';
import AnimationManager from './util/AnimationManager';

const DEFAULT_WIDTH = 1662;
const DEFAULT_HEIGHT = 1662;

class Visualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.animationManager = new AnimationManager(this.props.animations, this.changeAnimation);
    }

    componentDidMount() {
        this.changeAnimation(this.animationManager.getCurrentAnimation());
    }

    changeAnimation = Animation => {
        const animation = new Animation(this.props.height || DEFAULT_HEIGHT, this.props.width || DEFAULT_WIDTH);
        this.setState({
            animation
        });
    };

    render() {
        if (!this.state.animation) {
            return null;
        }

        return (
            <PolygonCanvas
                width={this.props.width || DEFAULT_WIDTH}
                height={this.props.height || DEFAULT_HEIGHT}
                animation={this.state.animation}
                beginAnimation={this.animationManager.animate}
            />
        );
    }
}

export default Visualizer;
