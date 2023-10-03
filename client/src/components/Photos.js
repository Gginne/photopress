import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";

import PhotoDialog from "./PhotoDialog";
import AlbumList from "./AlbumList";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from '@mui/material/ImageListItemBar';

import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import Box from "@mui/material/Box"

import { useAuth } from "../context/AuthContext";
import useRequest from "../hooks/useRequest";
import { getPhotos } from "../services/photoService";


const Photos = (props) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogPhoto, setDialogPhoto] = useState(null);

  const { accessToken } = useAuth()
  const getPhotoRequest = useRequest(getPhotos())

  useEffect(() => {
    getPhotoRequest.trigger();
  }, []);

  const photos = useMemo(() => getPhotoRequest.data ?? [], [ getPhotoRequest.data ])


  const handleDialogOpen = async (photo) => {
    setOpenDialog(true);
    setDialogPhoto(photo);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setDialogPhoto(null);
  };

  const handlePhotoDelete = async (id) => {

    try {
      await axios.delete(`/api/photos/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": String(accessToken),
        },
      });

      getPhotos();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      
      
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
      {dialogPhoto != null ? (
        <PhotoDialog
          open={openDialog}
          photo={dialogPhoto}
          delete={() => handlePhotoDelete(dialogPhoto._id)}
          close={() => handleDialogClose()}
        />
      ) : (
        ""
      )}

        <ImageList cols={6} gap={8}>
          {photos.map((photo) => (
            <ImageListItem key={photo._id} onClick={() => handleDialogOpen(photo)}>
              <img
                src={`${photo.src}`}
                srcSet={`${photo.src}`}
                alt={photo.title}
                loading="lazy"
              />
               <ImageListItemBar
                title={photo.title}
                actionIcon={
                  <IconButton
                    sx={{ color: '#fffff' }}
                    aria-label={`info about ${photo.title}`}
                  >
                <InfoIcon />
              </IconButton>
            }
            
          />
            </ImageListItem>
          ))}
          
         
        </ImageList>

        </Box>
     
        <AlbumList />
    
        
    </Box>
  );
};

export default Photos;
