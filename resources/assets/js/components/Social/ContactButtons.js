import React, { Component } from "react";
import SlackButton from "./SlackButton";
import GithubButton from "./GithubButton";
import FacebookButtons from "./FacebookButtons";

class ContactButtons extends Component {
  render() {
    return (
      <div className="contact-button-wrapper">
        <div className="contact-button-column-one">
          <FacebookButtons />
        </div>
        <div className="contact-button-column-two">
          <SlackButton />
          <br />
          <GithubButton />
        </div>
      </div>
    );
  }
}

export default ContactButtons;
