import React, { useState } from 'react';
import {Link} from "react-router-dom"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate, Navigate } from "react-router-dom";

const Login = ({onSubmit}) =>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async e => {
        e.preventDefault()
        await onSubmit({email, password})
    }  

    return (
    
        <div style={{minWidth: "250px", maxWidth: "350px", margin: "auto", textAlign: "center"}}>
            <h1>Login</h1>
            <form method="POST" onSubmit={handleSubmit}>
                <div>
                    <TextField label="Email" name="email" onChange={e => setEmail(e.target.value)} margin="normal" 
                        fullWidth value={email} variant="outlined" />
                </div>
                <div>
                    <TextField label="Password" name="password" onChange={e => setPassword(e.target.value)} margin="normal" 
                        fullWidth value={password} variant="outlined" type="password" />
                </div>
                <br></br>
                <div>
                    <Button variant="contained" color="primary" type="submit" disableElevation> Sign In </Button>
                </div>
        
            </form>
              
        </div>
      
     
    )
}

    


export default Login;