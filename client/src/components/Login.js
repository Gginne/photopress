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

    handleSubmit = async () => {
        //...
        // Make the login API call
        const {email, password} = this.state

        console.log(email, password)
        /*const response = await fetch(`/api/auth`, {
          method: 'POST',
          body: JSON.stringify({ email, password })
        })
        //...
        // Extract the JWT from the response
        const { jwt_token } = await response.json()
        */
        //...
        // Do something the token in the login method
        //await login({ jwt_token })
      }
    
    render() {
        const {email, password} = this.state
        return (
            <div>
                <h1>Login</h1>
                <form  onSubmit={this.handleSubmit}>
                    <input value={email} name="email" onChange={e => this.handleChange(e)} />
                    <input type="password" value={password} name="password" onChange={e => this.handleChange(e)} />
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default Login;