import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RandomArt from "./RandomArt";
import SoundVisualizer from "./SoundVisualizer";

export default class App extends Component {
    render() {

        return (
            <BrowserRouter basename="/" >
                <Switch>
                    <Route exact path="/" component={RandomArt} />
                    <Route path="/visualizer" component={SoundVisualizer} />
                    <Route component={NoMatch}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

const NoMatch = () => {
    return (
        <p>No Match!</p>
    );
};

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
