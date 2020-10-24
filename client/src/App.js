import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login"
import Photos from "./components/Photos"

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLogged: false,
    };
  }
  handleLogin(){

  }
  render() {
    const { isLogged } = this.state;
    return (
      <Switch>
        <Route exact path="/login" render={() => <Login login={this.handleLogin} />} />
        {isLogged ? (
          <>
          <Route exact path="/" render={() => <Photos />} />
          <Route path="/api" render={() => <Photos />} />
          </>
        ) : (
          <>
          <Route exact path="/" render={() => <Login login={this.handleLogin} />} />
          <Route path="/api" render={() => <Login login={this.handleLogin} />} />
          </>
        )}
      </Switch>
    );
  }
}

export default App;
