import React, { Component } from 'react';

class App extends Component {
  constructor(){
    super()
    this.state = {
      photos: []
    }
  }

  async componentDidMount(){
    const res = await fetch("/api/photos")
    const data = await res.json()

    this.setState({photos: data}, () => console.log(this.state.photos))
  }

  render() {
    function toBase64(arr) {
      //arr = new Uint8Array(arr) if it's an ArrayBuffer
      return btoa(
         arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
      );
    }
    const {photos} = this.state
    return (
      <div>
        {photos.map(photo => {
          const {buffer, mimetype} = photo.image
          const img = toBase64(buffer.data)
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

export default App;
