import React, { Component } from 'react';
import ContactButtons from '../components/Social/ContactButtons';
import CircleLineVisualizer from '../components/V2/V3/ForestVisualizer4';
import Navigation from '../components/Navigation';

class SoundPolygonVisualizer extends Component {
    render() {
        return (
            <div>
                <Navigation />
                <div id="container">
                    <div className="content">
                        <CircleLineVisualizer />
                        <ContactButtons />
                    </div>
                </div>
            </div>
        );
    }
}

export default SoundPolygonVisualizer;
