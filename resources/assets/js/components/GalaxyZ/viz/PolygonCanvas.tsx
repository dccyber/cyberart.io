import React from 'react';
import GalaxyZ1 from './GalaxyZ1';

interface IProps {
    height: number;
    width: number;
    animation: GalaxyZ1;
    beginAnimation: (a: any) => void;
    persistent?: boolean;
}

interface IRefDict {
    [index: string]: any;
}

/**
 * Copyright Aaron Boyarsky, 2018
 */
class PolygonCanvas extends React.Component<IProps> {
    public g: Uint8ClampedArray | null = null;
    private ctx: CanvasRenderingContext2D | null = null;
    private imageData: ImageData | null = null;
    private refDict: IRefDict = {};

    public componentDidMount() {
        this.ctx = (this.refDict.canvas as HTMLCanvasElement).getContext('2d');
        this.imageData = this.ctx!.createImageData(this.props.width, this.props.height);
        this.g = this.imageData.data;

        this.ctx!.putImageData(this.imageData, 0, 0);

        this.props.beginAnimation(this.redraw);
    }

    public render() {
        return (
            <React.Fragment>
                <h5 style={{ margin: '5px' }}>{this.props.animation.title}</h5>
                <canvas
                    id="canvas"
                    ref={c => (this.refDict.canvas = c)}
                    width={this.props.width}
                    height={this.props.height}
                />
            </React.Fragment>
        );
    }

    private redraw = () => {
        this.iterate();
    };

    private iterate = () => {
        if (!this.props.persistent) {
            this.ctx!.fillStyle = '#000000';
            this.ctx!.fillRect(0, 0, this.props.width, this.props.height);
        }

        // Advance animation to the next frame
        this.props.animation.moveToNextFrame();

        // smaller circles on top
        const polygonsCopy = [...this.props.animation.cells];

        polygonsCopy.forEach(polygon => {
            polygon.draw(this.ctx!);
        });
    };
}

export default PolygonCanvas;
