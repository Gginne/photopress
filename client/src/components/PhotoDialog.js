import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';

import Typography from '@material-ui/core/Typography';
import styles from "./styles/PhotoDialogStyles"

class PhotoDialog extends Component {

    handleClose = () => {
        this.props.close()
    };
    toBase64 = arr => btoa( arr.reduce((data, byte) => data + String.fromCharCode(byte), ''))
    render() {
        
        const {open, photo, classes} = this.props
        const {buffer} = photo.image
        const img = this.toBase64(buffer.data)
        return (
            <Dialog 
            onClose={this.handleClose} 
            aria-labelledby="customized-dialog-title" 
            open={open}
           
            PaperProps ={{
                classes: {
                 root: classes.paper
                }
              }}
            >
                <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                {photo.title}
                </DialogTitle>
                <DialogContent dividers>
                <img src={`data:image/png;base64,${img}`} alt={photo.title} className={classes.dialogImg} />
                <Typography gutterBottom>
                    {photo.notes}
                </Typography>
                
                </DialogContent>
                <DialogActions>
                
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles, { withTheme: true })(PhotoDialog);