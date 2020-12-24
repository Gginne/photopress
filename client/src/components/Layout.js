import React, { Component } from 'react';
import NavDrawer from "./NavDrawer"
import {withStyles} from '@material-ui/core/styles';
import styles from "./styles/LayoutStyles"

class Layout extends Component {
    constructor(){
        super()
        this.state = {
            drawerOpen: false
        }
    }

    handleDrawerOpen = () => {
        this.setState({drawerOpen: true})
    };
    
    handleDrawerClose = () => {
        this.setState({drawerOpen: false})
    };

    render() {
        const { drawerOpen } = this.state
        const { children, classes } = this.props
        return (
            <div className={classes.root}>
                <NavDrawer open={drawerOpen} handleOpen={() => this.handleDrawerOpen()} handleClose={() => this.handleDrawerClose()} />
                {children}
            </div>
           
        );
    }
}

export default withStyles(styles, {withTheme: true})(Layout);