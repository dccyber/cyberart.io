import React, { Component } from 'react';
import ForestV1 from './ForestV1';
import ForestV2 from './ForestV2';
import Visualizer from '../Visualizer';

let w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight || e.clientHeight || g.clientHeight;

class CircleLineVisualizer extends Component {
    render() {
        return (
            <Visualizer
                height={y - 250}
                width={x}
                animations={[
                    //ForestV1,
                    ForestV2
                ]}
            />
        );
    }
}

export default CircleLineVisualizer;
