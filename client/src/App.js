import React, { Component } from "react";
import { Route, Switch  } from "react-router-dom";
import Login from "./components/Login"
import Logout from "./components/Logout"
import Photos from "./components/Photos"
import Register from "./components/Register"
import Cookies from "js-cookie"
import {UserProvider} from "./context/UserContext"

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLogged: Cookies.get('user') ? true : false
    };
  }
  handleLogin = () => {
    this.setState({isLogged: true})
  }
  handleLogout = () => {
    this.setState({isLogged: false})
  }

  render() {
    const { isLogged } = this.state;
 
    return (
      <div className="App">
        
        {isLogged ? (
            <Switch>
              <UserProvider>
                <Route exact path="/" render={props => <Photos />} />
                <Route exact path="/profile" render={props => <Photos />} />
                <Route exact path="/logout" render={props => <Logout {...props} logout={this.handleLogout} />} />
              </UserProvider>
            </Switch>
            
        ) : (
          <Switch>
            <Route exact path="/" render={props => <Login {...props} login={this.handleLogin} />} />
            <Route exact path="/login" render={props => <Login {...props} login={this.handleLogin} />} />
            <Route exact path="/register" render={props => <Register />} />
          </Switch>
        )}
        
        </div>
    );
  }
}

export default App;
