import React, { Component } from 'react'
import Cookies from "js-cookie"

class Logout extends Component {
    componentDidMount(){
        Cookies.remove("user")
        this.props.logout()
        this.props.history.push("/login")
    }
    render() {
        return (
            <div>
                <h1>Logout</h1>
            </div>
        )
    }
}

export default Logout