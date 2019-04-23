import React, { Component } from "react";
import ContactButtons from "../components/Social/ContactButtons";
import Visualizer from "../components/V2/Visualizer";
import Navigation from "../components/Navigation";

class SoundPolygonVisualizer extends Component {
    render() {
        return (
            <div>
                <Navigation />
                <div id="container">
                    <div className="content">
                        <Visualizer />
                        <ContactButtons />
                    </div>
                </div>
            </div>
        );
    }
}

export default SoundPolygonVisualizer;
