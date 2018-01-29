import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ContactButtons from './Social/ContactButtons';
import ArtBox from './Animation/ArtBox';

export default class App extends Component {
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

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
