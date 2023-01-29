import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";

import PhotoDialog from "./PhotoDialog";
import AlbumList from "./AlbumList";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import Box from "@mui/material/Box";
import usePhotos from "../hooks/usePhotos";

const Photos = (props) => {
  const {photos, deletePhoto} = usePhotos()
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogPhoto, setDialogPhoto] = useState(null);

  const user = useContext(UserContext)

  const handleDialogOpen = async (photo) => {
    setOpenDialog(true);
    setDialogPhoto(photo);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setDialogPhoto(null);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        {dialogPhoto != null ? (
          <PhotoDialog
            open={openDialog}
            photo={dialogPhoto}
            delete={() => deletePhoto(dialogPhoto._id)}
            close={() => handleDialogClose()}
          />
        ) : (
          ""
        )}

        <ImageList cols={6} gap={8}>
          {photos.map((photo) => (
            <ImageListItem
              key={photo._id}
              onClick={() => handleDialogOpen(photo)}
            >
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
                    sx={{ color: "#fffff" }}
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
