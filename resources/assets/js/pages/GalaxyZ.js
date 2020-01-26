import React, { Component } from "react";
import Navigation from "../components/Navigation";
import GalaxyZVisualizer from "../components/GalaxyZ/viz/GalaxyZVisualizer";

class GalaxyZ extends Component {
    render() {
        return (
            <div>
                <Navigation />
                <div id="container">
                    <div className="content">
                        <GalaxyZVisualizer />
                    </div>
                </div>
            </div>
        );
    }
}

export default GalaxyZ;
