import React, { Component } from 'react';
import UserContext from "../context/UserContext"
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import axios from 'axios'
import {withStyles  } from '@material-ui/core/styles';
import styles from "./styles/PhotoStyles"


class Photos extends Component {
    static contextType = UserContext
    
    constructor(){
        super()
        this.state = {
          username: "",
          photos: []
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

    toBase64 = arr => btoa( arr.reduce((data, byte) => data + String.fromCharCode(byte), ''))

    render() {
        const {photos, username, title, notes} = this.state
        const {classes, theme} = this.props
        return (
          <div>
          <h1>Photos of {username}</h1>
          <div className={classes.root}>
            <GridList cellHeight={180} spacing={1} cols={5} className={classes.gridList} >
            {photos.map(photo => {
              const {buffer} = photo.image
              const img = this.toBase64(buffer.data)
              return (
                <GridListTile key={photo._id} cols={1}>
                  <img src={`data:image/png;base64,${img}`} alt={photo.title}/>
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