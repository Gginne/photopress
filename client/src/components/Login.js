import React, { useState } from 'react';
import {Link} from "react-router-dom"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
const Login = props =>{
    const navigate = useNavigate();
    const {login, register, currentUser} = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async e => {
        e.preventDefault()
   
        await login(email, password)

        navigate('/')
    
    }  

    return (
        <div style={{minWidth: "250px", maxWidth: "350px", margin: "auto", textAlign: "center"}}>
            <h1>Login</h1>
            <form method="POST" onSubmit={e => handleLogin(e)}>
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
                <br></br>
                <div>
                    Don't have an account? <Link style={{textDecoration: "none"}} to="/register">Register</Link>
                </div>
            </form>
        </div>
    )
}

    


export default Login;