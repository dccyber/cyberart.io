import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { withStyles } from "@material-ui/core/styles";
import { withTheme } from "@material-ui/core/styles";
import { withRouter } from 'react-router-dom';

class Navigation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        };
    }

    handleClick = (event) => {
        // This prevents ghost click.
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget
        });
    };

    handleClose = (route) => () => {
        this.setState({
            open: false,
            anchorEl: null
        }, () => {
            this.props.history.push(route);
        });
    };

    render() {
        const { classes } = this.props;

        const {anchorEl} = this.state;

        return (
            <div>
                <div className={classes.root}>
                    <AppBar position="static" color="primary">
                        <Toolbar>
                            <IconButton className={classes.menuButton} onClick={this.handleClick} color="inherit" aria-label="Menu" aria-controls="simple-menu" aria-haspopup="true">
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={this.handleClose}
                            >
                                <MenuItem onClick={this.handleClose('/')}>Random Canvas Demos</MenuItem>
                                <MenuItem onClick={this.handleClose('/visualizer')}>Sound Visualizer</MenuItem>
                                <MenuItem onClick={this.handleClose('/polygonVisualizer')}>Sound Visualizer</MenuItem>
                                <MenuItem onClick={this.handleClose('/imageLoader')}>Image Effect, Canvas Interface</MenuItem>
                                <MenuItem onClick={this.handleClose('/v2')}>Brownian Motion and Sin Waves</MenuItem>
                                <MenuItem onClick={this.handleClose('/v3')}>Forest Visualizer 1</MenuItem>
                                <MenuItem onClick={this.handleClose('/v4')}>Forest Visualizer 2</MenuItem>
                            </Menu>
                            <Typography variant="h6" color="inherit" className={classes.grow}>
                                cyberart.io
                            </Typography>
                            {/*<Button color="inherit">Login</Button>*/}
                        </Toolbar>
                    </AppBar>
                </div>
            </div>
        );
    }
}

const styles = {
    root: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    }
};

export default withRouter(withStyles(styles)(withTheme()(Navigation)));
