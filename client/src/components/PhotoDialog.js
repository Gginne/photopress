import React, { useState } from 'react';

import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import PhotoIcon from '@mui/icons-material/Photo';

import ConfirmDialog from "./ConfirmDialog"

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

    const {open, photo} = props

    return (
        <Dialog 
        onClose={handleClose} 
        aria-labelledby="customized-dialog-title" 
        open={open}
        fullWidth={showMore}
        maxWidth = {showMore ? 'sm' : 'lg'}
        >
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                <Typography variant="h6">{photo.title}</Typography>
                <div>
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
                : <img src={photo.src} alt={photo.title} />
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


export default PhotoDialog;