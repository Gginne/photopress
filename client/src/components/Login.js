import React, { Component } from 'react';
import Cookies from "js-cookie"
import axios from 'axios'
import {Link} from "react-router-dom"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class Login extends Component {
    constructor(){
        super()
        this.state = {
            email: "",
            password: ""
        }
      }
    
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = async e => {
        e.preventDefault()
        //...
        // Make the login API call
        const {email, password} = this.state
        const response = await axios.post('/api/auth', {email, password});
        //...
        // Extract the JWT from the response
        const {data} = response

        Cookies.set('user', data, {expires: 1/24})
        this.props.login()
        this.props.history.push("/")
        //...
        // Do something the token in the login method
        //await login({ jwt_token })

        
    }
    
    render() {
        const {email, password} = this.state
        return (
            <div style={{minWidth: "250px", maxWidth: "350px", margin: "auto", textAlign: "center"}}>
                <h1>Login</h1>
                <form method="POST" onSubmit={e => this.handleSubmit(e)}>
                    <div>
                        <TextField label="Email" name="email" onChange={this.handleChange} margin="normal" 
                            fullWidth value={email} variant="outlined" />
                    </div>
                    <div>
                        <TextField label="Password" name="password" onChange={this.handleChange} margin="normal" 
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
}

export default Login;