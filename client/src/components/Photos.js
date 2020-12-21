import React, { Component } from 'react';
import UserContext from "../context/UserContext"
//import axios from 'axios'

class Photos extends Component {
    static contextType = UserContext
    
    constructor(){
        super()
        this.state = {
          username: "",
          photos: []
        }
      }
    
    async componentDidMount(){
      const {username, id} = this.context.user.user
      
      this.setState({username})
    }
    
    toBase64(arr) {
        //arr = new Uint8Array(arr) if it's an ArrayBuffer
        return btoa(
           arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
      }
    render() {
        const {photos, username} = this.state
        return (
          <div>
            <h1>Photos of {username} </h1>
            {photos.map(photo => {
              const {buffer} = photo.image
              const img = this.toBase64(buffer.data)
              return (
                <div>
                <h2>{photo.title}</h2>
                <img src={`data:image/png;base64,${img}`} alt={photo.title} width="200px"/>
                </div>
              )
            })}
          </div>
        )
      }
}

export default Photos;