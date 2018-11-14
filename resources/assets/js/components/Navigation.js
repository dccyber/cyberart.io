import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

class Navigation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
    }

    handleClick (event) {
        // This prevents ghost click.
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    }

    handleRequestClose () {
        this.setState({
            open: false,
        });
    }

    render() {

        return (
            <div>
                <AppBar
                    title="cyberart.io"
                    style={{backgroundColor:'#222'}}
                    titleStyle={{textAlign:'center', marginLeft: '-28px'}}
                    onLeftIconButtonClick={this.handleClick}
                />
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose}
                >
                    <Menu style={{backgroundColor:'#222'}} menuItemStyle={{color:'#FFF'}}>
                        <MenuItem onClick={() => {window.location.href='/'}} primaryText="Random Animations" />
                        <MenuItem onClick={() => {window.location.href='/visualizer'}} primaryText="Equalizer (sound)" />
                        <MenuItem onClick={() => {window.location.href='/polygonVisualizer'}} primaryText="Drifting Circles (sound)" />
                        <MenuItem onClick={() => {window.location.href='/mineflowVisualizer'}} primaryText="Mine Water Flow" />
                    </Menu>
                </Popover>
            </div>

        );
    }
}

export default Navigation;