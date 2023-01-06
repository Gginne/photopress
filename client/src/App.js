import React, { useState, createContext } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import { Route, Switch  } from "react-router-dom";
import Login from "./components/Login"
import Logout from "./components/Logout"
import Photos from "./components/Photos"
import PhotoForm from "./components/PhotoForm"
import Register from "./components/Register"
import Cookies from "js-cookie"
import {UserProvider} from "./context/UserContext"

function App(){
  const [isLogged, setIsLogged] = useState((Cookies.get('user') ? true: false))
  
  return (
    <div className="App" style={{background: "#F9F9F9"}}>
        <CssBaseline />
        {isLogged ? (
            <Switch>
              <UserProvider>
                <Route exact path="/" render={props => <Photos />} />
                <Route exact path="/photos" render={props => <Photos />} />
                <Route exact path="/photos/new" render={props => <PhotoForm {...props} />} />
                <Route exact path="/logout" render={props => <Logout {...props} logout={() => setIsLogged(false)} /> } />
              </UserProvider>
            </Switch>
            
        ) : (
          <Switch>
            <Route exact path="/*" render={props => <Login {...props} login={() => setIsLogged(true)} />} />
            <Route exact path="/login" render={props => <Login {...props} login={() => setIsLogged(true)} />} />
            <Route exact path="/register" render={props => <Register {...props} />} />
          </Switch>
        )}
        
      </div>
  )
}


export default App;
