import React, { useState, useContext } from 'react';
import UserContext from "../context/UserContext"
import axios from 'axios'
import {withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import styles from "./styles/PhotoFormStyles"

const PhotoForm = props => {
  const [image, setImage] = useState(null)
  const [title, setTitle] = useState("")
  const [notes, setNotes] = useState("")
  const [tags, setTags] = useState("")

  const userContext = useContext(UserContext)
  //

  const handleSubmit = async e => {

    e.preventDefault()

    const {token} = userContext.user

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

    setTitle("")
    setNotes("")
    
    props.history.push("/photos")
  }

  const {classes} = props
  return (
    <div>
      <h1>New Photo</h1>
      <div className={classes.container}>
          <form method="POST" onSubmit={e => handleSubmit(e)} encType="multipart/form-data">
          <Button variant="contained" component="label" disableElevation>
            Upload File
            <input
              accept="image/*"
              margin="normal"
              type="file"
              name="image"
              onChange={e => setImage(URL.createObjectURL(e.target.files[0]))}
              required
              hidden
            />
          </Button>
          
          {image != null ? <div><img src={image}/></div> : ""}
          <div>
            <TextField label="Title" name="title" onChange={e => setTitle(e.target.value)} margin="normal" 
              fullWidth value={title} variant="outlined" 
            />
          </div>
          <div>
            <TextField label="Notes" name="notes" onChange={e => setNotes(e.target.value)} margin="normal" 
              multiline rowsMax={8} fullWidth value={notes} variant="outlined" 
            />
          </div>
          <div>
            <TextField label="Tags" name="tags" onChange={e => setTags(e.target.value)} margin="normal" 
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


export default withStyles(styles, { withTheme: true })(PhotoForm);