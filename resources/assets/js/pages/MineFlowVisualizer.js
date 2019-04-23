import React, { Component } from "react";
import ContactButtons from "../components/Social/ContactButtons";
import MineFlowVis from "../components/Animation/MineFlowVis";
import Navigation from "../components/Navigation";

class MineFlowVisualizer extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <div id="container">
          <div className="content">
            <MineFlowVis />
            <ContactButtons />
          </div>
        </div>
      </div>
    );
  }
}

export default MineFlowVisualizer;
