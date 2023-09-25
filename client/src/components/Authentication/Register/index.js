import React, { useState } from 'react'
import axios from "axios"
import {Link} from "react-router-dom"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const Register = ({onSubmit}) => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConf, setPasswordConf] = useState("")

    const handleSubmit = async e => {
        e.preventDefault()
        await onSubmit({username, email, password})
    }  
    
    return (
        <div style={{minWidth: "250px", maxWidth: "350px", margin: "auto", textAlign: "center"}}>
            <h1>Register</h1>
            <form method="POST" onSubmit={handleSubmit}>
                <div>
                    <TextField label="Email" name="email" onChange={e => setEmail(e.target.value)} margin="normal" 
                        fullWidth value={email} variant="outlined" />
                </div>
                <div>
                    <TextField label="Username" name="username" onChange={e => setUsername(e.target.value)} margin="normal" 
                        fullWidth value={username} variant="outlined" />
                </div>
                <div>
                    <TextField label="Password" name="password" onChange={e => setPassword(e.target.value)} margin="normal" 
                        fullWidth value={password} variant="outlined" type="password" />
                </div>
                <div>
                    <TextField label="Confirm Password" name="passwordConf" onChange={e => setPasswordConf(e.target.value)} margin="normal" 
                        fullWidth value={passwordConf} variant="outlined" type="password" />
                </div>
                <br></br>
                <div>
                    <Button variant="contained" color="primary" type="submit" disableElevation> Sign Up </Button>
                </div>
              
            </form>
        </div>
    )
    
}
export default Register
