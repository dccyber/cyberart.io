import React, { Component } from "react";

class SlackButton extends Component {
    render() {
        return (
            <React.Fragment>
                <a href="https://join.slack.com/t/cyberart-io/shared_invite/enQtMzAzNzcxOTgwMDk3LTZiZWMyNGM5Y2UwMmY3NWIwYmZkOGIzNWY5NTAzOWE5YzZlZjQ4NzRhYWM4NGRiY2RmNTZkZjc0MjFiZmU2ZTU">
                    <img
                        id="slack-button"
                        src="/img/btn-sign-in-with-slack.svg"
                    />
                </a>
            </React.Fragment>
        );
    }
}

export default SlackButton;
