import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";

import PhotoDialog from "./PhotoDialog";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from '@mui/material/ImageListItemBar';

import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";



const Photos = (props) => {
  const [photos, setPhotos] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogPhoto, setDialogPhoto] = useState(null);

  const { user } = useContext(UserContext);

  useEffect(() => {
    getPhotos();

    const interval = setInterval(() => {
      getPhotos();
    }, 1000 * 60 * 60);

    return () => clearInterval(interval);
  }, []);

  const getPhotos = async () => {
    const { token } = user;

    try {
      const response = await axios.get("/api/photos", {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": String(token),
        },
      });
      setPhotos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDialogOpen = async (photo) => {
    setOpenDialog(true);
    setDialogPhoto(photo);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setDialogPhoto(null);
  };

  const handlePhotoDelete = async (id) => {
    const { token } = user;

    try {
      await axios.delete(`/api/photos/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": String(token),
        },
      });

      getPhotos();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container spacing={1}>
   
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

      <Grid item sm={10}>
        <ImageList cols={7} gap={8}>
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
      </Grid>

      <Grid item sm={2}>

      </Grid>
    </Grid>
  );
};

export default Photos;
