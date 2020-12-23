import React, { Component } from 'react';
import UserContext from "../context/UserContext"
import Grid from '@material-ui/core/Grid';
import axios from 'axios'
import clsx from 'clsx';
import { makeStyles, withStyles, useTheme  } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const drawerWidth = 240;

const styles = (theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
});

class Photos extends Component {
    static contextType = UserContext
    
    constructor(){
        super()
        this.state = {
          username: "",
          photos: [],
          title: "",
          notes: "",
          open: false
        }
      }
    
    componentDidMount(){
      const {username, id} = this.context.user.user
      this.setState({username})
      this.getPhotos()
    }


    getPhotos = async e => {
      const {token} = this.context.user

      const response = await axios.get('/api/photos', {
        headers: {
          "Content-Type": 'application/json',
          "x-auth-token": String(token)
      }});
      
      const {data} = response
      //console.log(data)
      this.setState({photos: data})
    }

    handleChange = e => {
      this.setState({
          [e.target.name]: e.target.value
      })
    }

    handleSubmit = async e => {
      e.preventDefault()
      const {title, notes} = this.state
      const {token} = this.context.user

      const formData = new FormData();
      formData.append('image',  e.target.image.files[0]);
      formData.append('title', title);
      formData.append('notes', notes);

      const response = await axios.post('/api/photos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          "x-auth-token": String(token)
      }});

      this.setState({
        title: "",
        notes: ""
      })
      this.getPhotos()
    }

    handleDrawerOpen = () => {
      this.setState({open: true})
    };
  
    handleDrawerClose = () => {
      this.setState({open: false})
    };

    toBase64 = arr => btoa( arr.reduce((data, byte) => data + String.fromCharCode(byte), ''))

    render() {
        const {photos, username, title, notes, open} = this.state
        const {classes, theme} = this.props
        return (
          <div className={classes.root}>
          <CssBaseline />
              
           
         
          <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            })}
            classes={{
              paper: clsx({
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
              }),
            }}
          >
            
            <div className={classes.toolbar}>
              <IconButton onClick={open ? this.handleDrawerClose : this.handleDrawerOpen}>
                {open ? <ChevronLeftIcon /> : <MenuIcon />}
              </IconButton>
            </div>
            <Divider />
            <List bgcolor="secondary.main">
              {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar}>
            </div>
          <div>
            <form method="POST" onSubmit={e => this.handleSubmit(e)} encType="multipart/form-data">
              <input type="file" name="image" />
              <input type="text" onChange={this.handleChange} value={title} name="title" />
              <input type="text" onChange={this.handleChange} value={notes} name="notes" />
              <button type="submit">Submit</button>
            </form>
            <br></br>
            <Grid container spacing={1}>
            {photos.map(photo => {
              const {buffer} = photo.image
              const img = this.toBase64(buffer.data)
              return (
                <Grid container item xs={12} sm={12} md={6} lg={4} spacing={3} key={photo._id}>
                  <div>
                    <h2>{photo.title}</h2>
                    <img src={`data:image/png;base64,${img}`} alt={photo.title} width="175px"/>
                  </div>
                </Grid>
              )
            })}
            </Grid>
          </div>
          </main>
        </div>
        )
      }
}

export default withStyles(styles, { withTheme: true })(Photos);