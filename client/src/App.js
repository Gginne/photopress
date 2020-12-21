import React, { Component } from "react";
import { Route, Switch  } from "react-router-dom";
import Login from "./components/Login"
import Logout from "./components/Logout"
import Photos from "./components/Photos"
import Register from "./components/Register"
import Navbar from "./components/Navbar"
import Cookies from "js-cookie"
import {UserProvider} from "./context/UserContext"

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLogged: Cookies.get('user') ? true : false,
    };
  }


  render() {
    const { isLogged } = this.state;
 
    return (
      <div className="App">
        
        {isLogged ? (
            <UserProvider>
            <Navbar />
            <Route exact path="/" component={Photos} />
            <Route exact path="/profile" component={Photos}  />
            <Route exact path="/logout" component={Logout}  />
            </UserProvider>
        ) : (
          <>
          <Route exact path="/" component={Login}  />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          </>
        )}
        
        </div>
    );
  }
}

export default App;
