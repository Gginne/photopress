import React, { Component } from "react";
import { Route, Switch  } from "react-router-dom";
import Login from "./components/Login"
import Logout from "./components/Logout"
import Photos from "./components/Photos"
import Register from "./components/Register"
import Navbar from "./components/Navbar"

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLogged: false,
    };
  }
  handleLogin = () => {
    this.state.isLogged = true
  }
  handleLogout = () => {
    this.state.isLogged = false
  }
  render() {
    const { isLogged } = this.state;
    return (
      <div className="App">
      
        {isLogged ? (
          <>
          <Navbar />
          <Route exact path="/" render={() => <Photos />} />
          <Route exact path="/profile" render={() => <Photos />} />
          <Route exact path="/logout" render={() => <Logout logout={this.handleLogout} />} />
          </>
        ) : (
          <>
          <Route exact path="/" render={() => <Login login={this.handleLogin} />} />
          <Route exact path="/login" render={() => <Login login={this.handleLogin} />} />
          <Route exact path="/register" render={() => <Register />} />
          </>
        )}

        </div>
    );
  }
}

export default App;
