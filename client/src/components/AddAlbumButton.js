import React, { useState, useContext } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";

export default function AddAlbumButton() {

  const { user } = useContext(UserContext);

  const [open, setOpen] = useState(false);
  const [albumName, setAlbumName] = useState("");

  const openDialog = () => setOpen(true);
  const closeDialog = () => {
    setAlbumName("");
    setOpen(false);
  }

  const handleSubmit = async () => {
    const { token } = user;
    try {
      await axios.post("/api/albums", {name: albumName}, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": String(token),
        },
      });
    } catch (error) {
      console.log(error);
    }
    closeDialog()
  }

  return (
    <>
      <Button color="inherit" onClick={openDialog}>new</Button>

      <Dialog onClose={closeDialog} open={open}>
        <DialogTitle>Create New Album</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Album Name"
            fullWidth
            variant="standard"
            value={albumName}
            onChange={e => setAlbumName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
