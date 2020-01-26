import React, {Component} from "react";
import GalaxyZ1 from "./GalaxyZ1";
import Visualizer from "./Visualizer";
import ScreenModes from "./ScreenModes";

class GalaxyZVisualizer extends Component {
    render() {
        return (
            <Visualizer
                animations={[
                    GalaxyZ1,
                ]}
                mode={ ScreenModes.FULLSCREEN }
            />
        );
    }
}

export default GalaxyZVisualizer;
