import React, { useState } from 'react';
import Cookies from "js-cookie"
import axios from 'axios'
import {Link} from "react-router-dom"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const Login = props =>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = async e => {
        e.preventDefault()
   
        const response = await axios.post('/api/auth', {email, password});
    
        const {data} = response

        Cookies.set('user', data, {expires: 1/24})
        props.login()
        props.history.push("/")
    
    }  

    return (
        <div style={{minWidth: "250px", maxWidth: "350px", margin: "auto", textAlign: "center"}}>
            <h1>Login</h1>
            <form method="POST" onSubmit={e => onSubmit(e)}>
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