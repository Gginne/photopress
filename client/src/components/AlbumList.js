import * as React from "react";

import Drawer from "@mui/material/Drawer";

import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";

import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";

import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";

import { Divider } from "@mui/material";
import AddAlbumButton from "./AddAlbumButton";
import TextField from "@mui/material/TextField"

const drawerWidth = 240;

export default function AlbumList() {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="right"
    >
      <Toolbar>
      <TextField
          required
          label="Search Album"
          defaultValue=""
          size="small"
          variant="standard"
        />
      <AddAlbumButton />
      </Toolbar>
      
      <Divider />
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="All Photos" secondary="x photos" />
        </ListItem>
      </List>
    </Drawer>
  );
}
