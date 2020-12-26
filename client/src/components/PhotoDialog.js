import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import styles from "./styles/PhotoDialogStyles"

class PhotoDialog extends Component {

    handleClose = () => {
        this.props.close()
    };
    
    render() {
        const {open, photo} = this.props
        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">{photo.title}</DialogTitle>
            <List>
                
                <ListItem autoFocus button>
                <ListItemAvatar>
                    <Avatar>
                    <AddIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Add account" />
                </ListItem>
            </List>
            </Dialog>
        );
    }
}

export default withStyles(styles, { withTheme: true })(PhotoDialog);;