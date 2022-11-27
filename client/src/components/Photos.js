import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";

import PhotoDialog from "./PhotoDialog";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles/PhotoStyles";

const Photos = (props) => {
  const [photos, setPhotos] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogPhoto, setDialogPhoto] = useState(null);

  const { user } = useContext(UserContext);

  useEffect(() => {
    getPhotos()
    
    const interval = setInterval(() => {
      getPhotos()
    }, (1000*60*60));
  
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
    const { token } = this.context.user;

    try {
      await axios.delete(`/api/photos/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": String(token),
        },
      });

      this.getPhotos();
    } catch (error) {
      console.log(error);
    }
  };

  const classes = props;

  return (
    <div>
      <h1>Photos of {user.user.username}</h1>
      {dialogPhoto != null ? (
        <PhotoDialog
          open={openDialog}
          photo={dialogPhoto}
          delete={() => handlePhotoDelete()}
          close={() => handleDialogClose()}
        />
      ) : (
        ""
      )}

      <div className={classes.root}>
        <GridList
          cellHeight={180}
          spacing={2}
          cols={5}
          className={classes.gridList}
        >
          {photos.map((photo) => {
            return (
              <GridListTile
                key={photo._id}
                cols={1}
                onClick={() => handleDialogOpen(photo)}
              >
                <img src={photo.src} alt={photo.title} />
                <GridListTileBar
                  title={photo.title}
                  actionIcon={
                    <IconButton aria-label={`info about ${photo.title}`}>
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </GridListTile>
            );
          })}
        </GridList>
      </div>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(Photos);
