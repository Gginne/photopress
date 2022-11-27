import React, { useState } from 'react';
import NavDrawer from "./NavDrawer"
import {withStyles} from '@material-ui/core/styles';
import styles from "./styles/LayoutStyles"

const Layout = props => {
    const [drawerOpen, setDrawerOpen] = useState(false)

    const { children, classes } = props

    return (
        <div className={classes.root}>
            <NavDrawer open={drawerOpen} 
                       handleOpen={() => setDrawerOpen(true)}  
                       handleClose={() => setDrawerOpen(false)} 
            />
            <div className={classes.content}>
                {children}
            </div>
        </div>
       
    );

}

export default withStyles(styles, {withTheme: true})(Layout);