import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import PhotoIcon from '@material-ui/icons/Photo';

import styles from "./styles/PhotoDialogStyles"

class PhotoDialog extends Component {

    constructor(){
        super()
        this.state = {
            showMore: false
        }
    }

    handleClose = () => {
        this.props.close()
    };

    handleShowMore = () => {
        this.setState(prevState => ({showMore: !prevState.showMore}))
    }

    toBase64 = arr => btoa( arr.reduce((data, byte) => data + String.fromCharCode(byte), ''))
    render() {
        
        const {open, photo, classes} = this.props
        const {showMore} = this.state
        const {buffer} = photo.image
        const img = this.toBase64(buffer.data)
        return (
            <Dialog 
            onClose={this.handleClose} 
            aria-labelledby="customized-dialog-title" 
            open={open}
            fullWidth={showMore}
            maxWidth = {showMore ? 'sm' : 'lg'}
            PaperProps ={{classes: {root: classes.paper}}}
            >
                <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                    <Typography variant="h6">{photo.title}</Typography>
                    <div className={classes.buttons}>
                        <IconButton aria-label="more" onClick={this.handleShowMore}>
                            {showMore ? <PhotoIcon /> : <InfoIcon /> }
                        </IconButton>
                        <IconButton aria-label="delete">
                            <DeleteIcon />
                        </IconButton> 
                    </div>
                </DialogTitle>
                <DialogContent dividers>
                {
                    showMore ?
                    <div>
                        <p>Date: {photo.created_at} </p>
                        {photo.notes}
                        
                    </div>
                    : <img src={`data:image/png;base64,${img}`} alt={photo.title} className={classes.dialogImg} />
                }
                
                </DialogContent>
                
            </Dialog>
        );
    }
}

export default withStyles(styles, { withTheme: true })(PhotoDialog);