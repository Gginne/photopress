import React, { Component } from 'react';
import axios from 'axios'

class Login extends Component {
    constructor(){
        super()
        this.state = {
            
        }
      }
    
      async componentDidMount(){
        const res = await fetch("/api/photos")
        const data = await res.json()
    
        this.setState({photos: data}, () => console.log(this.state.photos))
      }
    
    render() {
        return (
            <div>
                <h1>Login</h1>
            </div>
        )
    }
}

export default Login;