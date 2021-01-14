import React, { Component } from 'react';
import UserContext from "../context/UserContext"
import axios from 'axios'
import {withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import styles from "./styles/PhotoFormStyles"


class PhotoForm extends Component {
    static contextType = UserContext
    
    constructor(){
        super()
        this.state = {
          image: null,
          title: "",
          notes: "",
          tags: ""
        }
      }
    

    handleChange = e => {
      let {name, value} = e.target
      if(name == "image"){
        this.setState({[name]: URL.createObjectURL(e.target.files[0])})
      } else {
        this.setState({[name]: value})
      }
      
    }

    handleSubmit = async e => {
      e.preventDefault()
      const {title, notes, tags} = this.state
      const {token} = this.context.user

      const formData = new FormData();
      formData.append('image',  e.target.image.files[0]);
      formData.append('title', title);
      formData.append('notes', notes);
      formData.append('tags', tags);
      
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
        const {image, title, notes, tags} = this.state
        const {classes} = this.props
        return (
          <div>
          <h1>New Photo</h1>
          <div className={classes.container}>
            <form method="POST" onSubmit={e => this.handleSubmit(e)} encType="multipart/form-data">
            <Button variant="contained" component="label" disableElevation>
              Upload File
              <input
                accept="image/*"
                margin="normal"
                type="file"
                name="image"
                onChange={this.handleChange}
                required
                hidden
              />
            </Button>
            
            {image != null ? <div><img src={image}/></div> : ""}
            <div>
              <TextField label="Title" name="title" onChange={this.handleChange} margin="normal" 
                fullWidth value={title} variant="outlined" 
              />
            </div>
            <div>
              <TextField label="Notes" name="notes" onChange={this.handleChange} margin="normal" 
                multiline rowsMax={8} fullWidth value={notes} variant="outlined" 
              />
            </div>
            <div>
              <TextField label="Tags" name="tags" onChange={this.handleChange} margin="normal" 
                multiline rowsMax={8} fullWidth value={tags} variant="outlined" pattern="[^,\s?]"
              />
            </div>
            <br></br>
            <div>
              <Button variant="contained" color="primary" type="submit" disableElevation> Submit </Button>
            </div>
            </form>  
          </div>
        </div>
        )
      }
}

export default withStyles(styles, { withTheme: true })(PhotoForm);