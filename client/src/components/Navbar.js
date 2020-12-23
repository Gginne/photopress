import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class Navbar extends Component {
    render() {
        return (
            <nav>
                <ul>
                    <li><Link to="/">Profile</Link></li>
                    <li><Link to="/logout">Logout</Link></li>
                </ul>
            </nav>
        )
    }
}

export default Navbar