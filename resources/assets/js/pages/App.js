import React, { Component } from "react";
import ReactDOM from "react-dom";
import RenderLib from "../components/V2/util/RenderLib";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import V2 from "./V2";
import V3 from "./V3";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            main: "#222"
        }
    }
});

export default class App extends Component {
    constructor() {
        super();
        RenderLib.registerVendorAnimationFunctions();
    }

    render() {
        return (
            <div>
                <MuiThemeProvider theme={theme}>
                    <BrowserRouter basename="/">
                        <Switch>
                            {/*
                            <Route exact path="/" component={RandomArt} />
                            <Route path="/visualizer" component={SoundVisualizer} />
                            <Route path="/polygonVisualizer" component={SoundPolygonVisualizer} />
                            <Route path="/imageLoader" component={ImageLoader} />

                           */}
                            <Route path="/v2" component={V2} />
                            <Route path="/v3" component={V3} />
                            <Route component={NoMatch} />
                        </Switch>
                    </BrowserRouter>
                </MuiThemeProvider>
            </div>
        );
    }
}

const NoMatch = () => {
    return <p>No Match!</p>;
};

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
