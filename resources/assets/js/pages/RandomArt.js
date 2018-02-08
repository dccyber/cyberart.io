import React, { Component } from 'react';
import ContactButtons from '../components/Social/ContactButtons';
import ArtBox from '../components/Animation/ArtBox';

class RandomArt extends Component {
    render() {

        return (
            <div id="container">
                <div className="content">
                    <ArtBox />
                    <ContactButtons />
                </div>
            </div>
        );
    }
}

export default RandomArt;