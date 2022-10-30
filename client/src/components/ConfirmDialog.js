import React, { Component } from 'react';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import ListItemText from "@material-ui/core/ListItemText"

import Avatar from "@material-ui/core/Avatar"
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';


class ConfirmDialog extends Component {
    
    render() {
        const { title, open, setOpen, onConfirm } = this.props;
        return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="confirm-dialog"
        >
            <DialogTitle id="confirm-dialog">{title}</DialogTitle>
                <List>
               
                <ListItem button onClick={() => {setOpen(false); onConfirm(); }}>
                    <ListItemAvatar>
                    <Avatar>
                        <CheckIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Confirm" />
                </ListItem>
            

                <ListItem autoFocus button  onClick={() => {setOpen(false)}}>
                <ListItemAvatar>
                    <Avatar>
                        <CloseIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Cancel" />
                </ListItem>
            </List>
        </Dialog>
        )
    }
}

export default ConfirmDialog;