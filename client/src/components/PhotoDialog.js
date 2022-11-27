import React, { useState } from 'react';
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

const formatDateTime = ds => new Date(ds).toLocaleString()

const PhotoDialog = props => {
    const [showMore, setShowMore] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)

    const handleClose = () => {
        props.close()
    };

    const handleShowMore = () => {
        setShowMore(!showMore)
        //this.setState(prevState => ({showMore: !prevState.showMore}))
    }

    const handleConfirmDelete = st => {
        setConfirmDelete(st)
    };

    const handleDelete = () => {
        const {_id} = props.photo

        handleClose()

        props.delete(_id)
    }

    const {open, photo, classes} = props

    return (
        <Dialog 
        onClose={handleClose} 
        aria-labelledby="customized-dialog-title" 
        open={open}
        fullWidth={showMore}
        maxWidth = {showMore ? 'sm' : 'lg'}
        PaperProps ={{classes: {root: classes.paper}}}
        >
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                <Typography variant="h6">{photo.title}</Typography>
                <div className={classes.buttons}>
                    <IconButton aria-label="more" onClick={handleShowMore}>
                        {showMore ? <PhotoIcon /> : <InfoIcon /> }
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => handleConfirmDelete(true)}>
                        <DeleteIcon />
                    </IconButton> 
                </div>
            </DialogTitle>
            <DialogContent dividers>
            {
                showMore ?
                <div>
                    <p>{photo.notes}</p>
                    <p>Uploaded: {formatDateTime(photo.created_at)} </p>
                    
                    
                </div>
                : <img src={photo.src} alt={photo.title} className={classes.dialogImg} />
            }

            <ConfirmDialog 
                title="Delete Photo?"
                open={confirmDelete}
                setOpen={handleConfirmDelete}
                onConfirm={handleDelete}
            />
            
            </DialogContent>
            
        </Dialog>
    );

}


export default withStyles(styles, { withTheme: true })(PhotoDialog);