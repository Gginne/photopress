import React from 'react';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import ListItemText from "@mui/material/ListItemText"

import Avatar from "@mui/material/Avatar"
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const ConfirmDialog = props => {
    const { title, open, setOpen, onConfirm } = props;
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


export default ConfirmDialog;