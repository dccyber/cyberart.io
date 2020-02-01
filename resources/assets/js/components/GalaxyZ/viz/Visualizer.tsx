import React from 'react';
import AnimationManager from './AnimationManager';
import PolygonCanvas from './PolygonCanvas';
import ScreenModes from './ScreenModes';
import { getClientDimensions } from './WindowLib';

const DEFAULT_WIDTH = 1662;
const DEFAULT_HEIGHT = 1662;

interface IProps {
    mode: number;
    animations: any[]; // TODO
    shrinkHeight?: number;
}

type State = ReturnType<typeof getInitialStateFromProps>;

const getInitialStateFromProps = (props: IProps) => {
    let width;
    let height;

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
        animation: null,
        height,
        width
    };
};

class Visualizer extends React.Component<IProps, State> {
    public readonly state = getInitialStateFromProps(this.props);
    private animationManager: AnimationManager;

    constructor(props: IProps) {
        super(props);
        this.animationManager = new AnimationManager(this.props.animations, this.changeAnimation);
    }

    public componentDidMount() {
        this.animationManager.refreshAnimation();
    }

    public render() {
        const { animation, width, height } = this.state;

        if (!animation) {
            return null;
        }

        return (
            <PolygonCanvas
                width={width}
                height={height}
                animation={animation!}
                beginAnimation={this.animationManager.animate}
                persistent={true}
            />
        );
    }

    private changeAnimation = (Animation: any) => {
        const animation = new Animation(this.state.height, this.state.width);
        this.setState({ animation });
    };
}

export default Visualizer;
