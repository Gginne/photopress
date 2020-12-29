import React, { Component } from 'react';
import Cookies from "js-cookie"
import axios from 'axios'
import {FormControl, InputLabel, Input, FormHelperText} from '@material-ui/core';

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
            <div>
                <h1>Login</h1>
                <form method="POST" onSubmit={e => this.handleSubmit(e)}>
                <FormControl>
                    <InputLabel htmlFor="email">Email address</InputLabel>
                    <Input id="email" name="email" value={email} name="email" onChange={e => this.handleChange(e)} aria-describedby="email-helper-text" />
                    <FormHelperText id="email-helper-text">We'll never share your email.</FormHelperText>
                </FormControl>
                    <input type="email" value={email} name="email" onChange={e => this.handleChange(e)} />
                    <input type="password" value={password} name="password" onChange={e => this.handleChange(e)} />
                    <button type="submit">Sign in</button>
                </form>
            </div>
        )
    }
}

export default Login;