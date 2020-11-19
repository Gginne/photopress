import React, { Component } from 'react';
import axios from 'axios'

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

        console.log(data)
        //...
        // Do something the token in the login method
        //await login({ jwt_token })

        
    }
    
    render() {
        const {email, password} = this.state
        console.log(email, password)
        return (
            <div>
                <h1>Login</h1>
                <form method="POST" onSubmit={e => this.handleSubmit(e)}>
                    <input value={email} name="email" onChange={e => this.handleChange(e)} />
                    <input type="password" value={password} name="password" onChange={e => this.handleChange(e)} />
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default Login;