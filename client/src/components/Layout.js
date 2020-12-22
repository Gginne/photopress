import React, { Component } from 'react';
import Navbar from "./Navbar"
class Layout extends Component {
    render() {
        const { children } = this.props
        return (
            <div>
                <Navbar />
                {children}
            </div>
        );
    }
}

export default Layout;