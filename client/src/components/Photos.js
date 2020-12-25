import React, { Component } from 'react';
import UserContext from "../context/UserContext"
import Grid from '@material-ui/core/Grid';
import axios from 'axios'
import {withStyles  } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
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
          <CssBaseline />
          <h1>Photos of {username}</h1>
          <div>
            <Grid container >
            {photos.map(photo => {
              const {buffer} = photo.image
              const img = this.toBase64(buffer.data)
              return (
                <Grid item xs={12} sm={12} md={6} lg={3} key={photo._id}>
                  <div>
                    <h2>{photo.title}</h2>
                    <img src={`data:image/png;base64,${img}`} alt={photo.title} width="175px"/>
                  </div>
                </Grid>
              )
            })}
            </Grid>
          </div>
        </div>
        )
      }
}

export default withStyles(styles, { withTheme: true })(Photos);