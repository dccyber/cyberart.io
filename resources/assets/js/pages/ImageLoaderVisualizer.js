import React, { Component } from 'react';
import ContactButtons from '../components/Social/ContactButtons';
import ImageLoaderVis from '../components/InterfaceApplication/ImageLoaderVis';
import Navigation from '../components/Navigation';

class ImageLoaderVisualizer extends Component {
    render() {
        return (
            <div>
                <Navigation />
                <div id="container">
                    <div className="content">
                        <ImageLoaderVis />
                    </div>
                </div>
            </div>
        );
    }
}

export default ImageLoaderVisualizer;
