import React, { Component } from 'react';
import ContactButtons from '../components/Social/ContactButtons';
import Visualizer from '../components/Animation/Visualizer';

class SoundVisualizer extends Component {
    render() {

        return (
            <div id="container">
                <div className="content">
                    <Visualizer />
                    <ContactButtons />
                </div>
            </div>
        );
    }
}

export default SoundVisualizer;