import React, { Component } from 'react';
import ContactButtons from '../components/Social/ContactButtons';
import ArtBox from '../components/Animation/ArtBox';
import Navigation from "../components/Navigation";

class RandomArt extends Component {

    render() {

        return (
            <div>
                <Navigation/>
                <div id="container">
                    <div className="content">
                        <ArtBox />
                        <ContactButtons />
                    </div>
                </div>
            </div>

        );
    }
}

export default RandomArt;