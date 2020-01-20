import React, {Component} from "react";
import ForestV4 from "./GalaxyZ1";
import Visualizer from "./Visualizer";
import ScreenModes from "./ScreenModes";

class GalaxyZVisualizer extends Component {
    render() {
        return (
            <Visualizer
                animations={[
                    ForestV4,
                ]}
                mode={ ScreenModes.FULLSCREEN }
            />
        );
    }
}

export default GalaxyZVisualizer;
