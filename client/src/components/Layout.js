import React from 'react';
import { Grid } from '@mui/material';
import Sidebar from './Sidebar';
const Layout = props => {

    const { children } = props

    return (
        <Grid container spacing={2} sx={{padding: '0.5rem'}}>
            <Grid item sm={1}>
                <Sidebar />
            </Grid>
            <Grid item sm={11}>
                {children}
            </Grid>
        
        </Grid>
       
    );

}

export default Layout;