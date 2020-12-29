import React, { Component } from 'react';
import UserContext from "../context/UserContext"
import axios from 'axios'
import {withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import styles from "./styles/PhotoFormStyles"


class PhotoForm extends Component {
    static contextType = UserContext
    
    constructor(){
        super()
        this.state = {
          title: "",
          notes: ""
        }
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
      
      try{
        await axios.post('/api/photos', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            "x-auth-token": String(token)
        }});
      }catch(error){
        console.log(error)
      }
      this.setState({
        title: "",
        notes: ""
      })
      
      this.props.history.push("/photos")
    }

    render() {
        const {title, notes} = this.state
        return (
          <div>
          <CssBaseline />
          <h1>New Photo</h1>
          <div>
            <form method="POST" onSubmit={e => this.handleSubmit(e)} encType="multipart/form-data">
              <input type="file" name="image" />
              <input type="text" onChange={this.handleChange} value={title} name="title" />
              <input type="text" onChange={this.handleChange} value={notes} name="notes" />
              <button type="submit">Submit</button>
            </form>  
          </div>
        </div>
        )
      }
}

export default withStyles(styles, { withTheme: true })(PhotoForm);