import React, { Component } from 'react';
import ContactButtons from '../components/Social/ContactButtons';
import PolygonVisualizer from '../components/Animation/PolygonVisualizer';
import Navigation from '../components/Navigation';

class SoundPolygonVisualizer extends Component {
    render() {
        return (
            <div>
                <Navigation />
                <div id="container">
                    <div className="content">
                        <PolygonVisualizer />
                        <ContactButtons />
                    </div>
                </div>
            </div>
        );
    }
}

export default SoundPolygonVisualizer;
