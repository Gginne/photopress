import React, { useState } from 'react'
import axios from "axios"
import {Link} from "react-router-dom"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const Register = (props) => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
 

    const onRegister = async e => {
        e.preventDefault()

        const signup = await axios.post('/api/users', {username, email, password});
        
        props.history.push("/login")

    }
    
    return (
        <div style={{minWidth: "250px", maxWidth: "350px", margin: "auto", textAlign: "center"}}>
            <h1>Register</h1>
            <form method="POST" onSubmit={e => onRegister(e)}>
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
                <br></br>
                <div>
                    <Button variant="contained" color="primary" type="submit" disableElevation> Sign Up </Button>
                </div>
                <br></br>
                <div>
                    Have an account? <Link style={{textDecoration: "none"}} to="/login">Login</Link>
                </div>
            </form>
        </div>
    )
    
}
export default Register
