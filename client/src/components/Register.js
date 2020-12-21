import React, { Component } from 'react'
import axios from "axios"

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
            <div>
                <h1>Register</h1>
                <form method="POST" onSubmit={e => this.handleSubmit(e)}>
                    <input value={username} name="username" onChange={e => this.handleChange(e)} />
                    <input type="email" value={email} name="email" onChange={e => this.handleChange(e)} />
                    <input type="password" value={password} name="password" onChange={e => this.handleChange(e)} />
                    <button>Sign up</button>
                </form>
            </div>
        )
    }
}
export default  Register
