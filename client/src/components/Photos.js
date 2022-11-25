import React, { Component } from 'react';
import axios from 'axios'
import UserContext from "../context/UserContext"
import PhotoDialog from "./PhotoDialog"
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import {withStyles} from '@material-ui/core/styles';
import styles from "./styles/PhotoStyles"


class Photos extends Component {
    static contextType = UserContext
    
    constructor(){
        super()
        this.state = {
          username: "",
          photos: [],
          openDialog: false,
          dialogPhoto: null
        }
      }
    
    componentDidMount(){
      const {username} = this.context.user.user
      this.setState({username})
    
      this.getPhotos()
    }

    getPhotos = async e => {
      const {token} = this.context.user

      try{
        const response = await axios.get('/api/photos', {
          headers: {
            "Content-Type": 'application/json',
            "x-auth-token": String(token)
        }});


        this.setState({photos: response.data})

      } catch(error){
        console.log(error)
      }
   
    }

    handleDialogOpen = photo => {
      this.setState({
        openDialog: true,
        dialogPhoto: photo
      })
    }

    handleDialogClose = () => {
      this.setState({
        openDialog: false,
        dialogPhoto: null
      })
    }

    handlePhotoDelete = async id => {
      const {token} = this.context.user

      try{
        await axios.delete(`/api/photos/${id}`, {
          headers: {
            "Content-Type": 'application/json',
            "x-auth-token": String(token)
        }});
        
        this.getPhotos()
       
       
      } catch(error){
        console.log(error)
      }
    }
    
    render() {
        const {photos, username, openDialog, dialogPhoto} = this.state
        const {classes} = this.props
       
        return (
          <div>
          <h1>Photos of {username}</h1>
          {
            dialogPhoto != null ? 
            <PhotoDialog open={openDialog} photo={dialogPhoto} delete={this.handlePhotoDelete} close={() => this.handleDialogClose()}/> 
            : ""
          }
          
          <div className={classes.root}>
          
            <GridList cellHeight={180} spacing={2} cols={5} className={classes.gridList} >
            {photos.map(photo => {
              
              return (
                <GridListTile key={photo._id} cols={1} onClick={() => this.handleDialogOpen(photo)}>
                  
                  <img src={photo.src} alt={photo.title}/>
                  <GridListTileBar
                  title={photo.title}
                  actionIcon={
                    <IconButton aria-label={`info about ${photo.title}`}>
                      <InfoIcon />
                    </IconButton>
                  }
                />
             
                </GridListTile>
                
              )
            })}
            </GridList>
          </div>
        </div>
        )
      }
}

export default withStyles(styles, { withTheme: true })(Photos);