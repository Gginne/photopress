import React, { Component } from 'react'
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { Link } from "react-router-dom";
import List from '@material-ui/core/List';

import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PhotoIcon from '@material-ui/icons/Photo';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import styles from "./styles/NavDrawerStyles"

class NavDrawer extends Component {
    render() {
        const { classes, open, handleOpen, handleClose } = this.props
        return (
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >

                <div className={classes.toolbar}>
                    <IconButton onClick={open ? handleClose : handleOpen}>
                        {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List bgcolor="secondary.main">

                    <Link to="/photos" className={classes.link}>
                        <ListItem button>
                            <ListItemIcon>
                                <PhotoIcon />
                            </ListItemIcon>
                            <ListItemText primary="Photo" />
                        </ListItem>
                    </Link>

                    <Link to="/albums" className={classes.link}>
                        <ListItem button>
                            <ListItemIcon>
                                <PhotoLibraryIcon />
                            </ListItemIcon>
                            <ListItemText primary="Albums" />
                        </ListItem>
                    </Link>

                    <Link to="/photos/new" className={classes.link}>
                        <ListItem button>
                            <ListItemIcon>
                                <AddPhotoAlternateIcon />
                            </ListItemIcon>
                            <ListItemText primary="New Photo" />
                        </ListItem>
                    </Link>
                    
                    <Link to="/albums/new" className={classes.link}>
                        <ListItem button>
                            <ListItemIcon>
                                <AddToPhotosIcon />
                            </ListItemIcon>
                            <ListItemText primary="New Album" />
                        </ListItem>
                    </Link>

                </List>
                <Divider />
                <List>
                    <Link to="/logout" className={classes.link}>
                        <ListItem button>
                            <ListItemIcon>
                                <ExitToAppIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />

                        </ListItem>
                    </Link>

                </List>
            </Drawer>
        )
    }
}

export default withStyles(styles, { withTheme: true })(NavDrawer)