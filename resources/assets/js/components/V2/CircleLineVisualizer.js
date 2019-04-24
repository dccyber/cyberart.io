import React, { Component } from "react";
import SoundCircle from "./SoundCircle";
import Visualizer from "./Visualizer";

let w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;

class CircleLineVisualizer extends Component {

    render() {
        console.log( `${x} x ${y}`);
        return (
            <Visualizer height={y - 250} width={x} animations={[SoundCircle]}/>
        );
    }
}

export default CircleLineVisualizer;
