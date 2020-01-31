import React, { Component } from 'react';
import ContactButtons from '../components/Social/ContactButtons';
import Visualizer from '../components/Animation/Visualizer';
import Navigation from '../components/Navigation';

class SoundVisualizer extends Component {
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

export default SoundVisualizer;
