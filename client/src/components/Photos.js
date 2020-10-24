import React, { Component } from 'react';

class Photos extends Component {
    constructor(){
        super()
        this.state = {
          photos: []
        }
      }
    toBase64(arr) {
        //arr = new Uint8Array(arr) if it's an ArrayBuffer
        return btoa(
           arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
      }
    render() {
        
        const {photos} = this.state
        return (
          <div>
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