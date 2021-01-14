import React, { Component } from 'react'
import axios from "axios"
import {Link} from "react-router-dom"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class Register extends Component {
    constructor(){
        super()
        this.state = {
            username: "",
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
        const {username, email, password} = this.state
        const response = await axios.post('/api/users', {username, email, password});
        //...
        // Extract the JWT from the response
        const {data} = response

        console.log(data)
        //...
        // Do something the token in the login method
        //await login({ jwt_token })

        
    }
    render() {
        const {username, email, password} = this.state
        return (
            <div style={{minWidth: "250px", maxWidth: "350px", margin: "auto", textAlign: "center"}}>
                <h1>Register</h1>
                <form method="POST" onSubmit={e => this.handleSubmit(e)}>
                    <div>
                        <TextField label="Email" name="email" onChange={this.handleChange} margin="normal" 
                            fullWidth value={email} variant="outlined" />
                    </div>
                    <div>
                        <TextField label="Username" name="username" onChange={this.handleChange} margin="normal" 
                            fullWidth value={username} variant="outlined" />
                    </div>
                    <div>
                        <TextField label="Password" name="password" onChange={this.handleChange} margin="normal" 
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
}
export default Register
