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

import ConfirmDialog from "./ConfirmDialog"
import styles from "./styles/PhotoDialogStyles"

class PhotoDialog extends Component {

    constructor(props){
        super(props)
        this.state = {
            showMore: false,
            confirmDelete: false,
        }
    }

    handleClose = () => {
        this.props.close()
    };

    handleShowMore = () => {
        this.setState(prevState => ({showMore: !prevState.showMore}))
    }

    handleConfirmDelete = st => {
        this.setState({confirmDelete: st})
    };

    handleDelete = () => {
        const {_id} = this.props.photo
        this.handleClose()
        this.props.delete(_id)
    }


    formatDateTime = ds => new Date(ds).toLocaleString()

    render() {
        
        const {open, photo, classes} = this.props
        const {showMore, confirmDelete} = this.state

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
                        <IconButton aria-label="delete" onClick={() => this.handleConfirmDelete(true)}>
                            <DeleteIcon />
                        </IconButton> 
                    </div>
                </DialogTitle>
                <DialogContent dividers>
                {
                    showMore ?
                    <div>
                        <p>{photo.notes}</p>
                        <p>Uploaded: {this.formatDateTime(photo.created_at)} </p>
                        
                        
                    </div>
                    : <img src={photo.src} alt={photo.title} className={classes.dialogImg} />
                }

                <ConfirmDialog 
                    title="Delete Photo?"
                    open={confirmDelete}
                    setOpen={this.handleConfirmDelete}
                    onConfirm={this.handleDelete}
                />
                
                </DialogContent>
                
            </Dialog>
        );
    }
}

export default withStyles(styles, { withTheme: true })(PhotoDialog);