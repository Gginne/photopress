import React, { Component } from 'react';
import Navbar from "./Navbar"
import Grid from '@material-ui/core/Grid';

class Layout extends Component {
    render() {
        const { children } = this.props
        return (
            <Grid container spacing={1}>
                <Grid container item xs={3} spacing={3}>
                    <Navbar />
                </Grid>
                <Grid container item xs={9} spacing={1}>
                    {children}
                </Grid>
            </Grid>
           
        );
    }
}

export default Layout;