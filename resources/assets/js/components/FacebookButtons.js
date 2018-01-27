import React, { Component } from 'react';

class FacebookButtons extends Component {
    render() {
        return (
            <React.Fragment>
                <a href="https://www.facebook.com/cyberart.io/"><img id="find-us-button" src="/img/find-us.png" /></a>
                <br />
                <div
                    className="fb-like"
                    data-href="https://www.facebook.com/cyberart.io/"
                    data-layout="button_count"
                    data-colorscheme="dark"
                    data-action="like"
                    data-size="large"
                    data-show-faces="true"
                    data-share="true"> </div>
            </React.Fragment>
        );
    }
}

export default FacebookButtons;
