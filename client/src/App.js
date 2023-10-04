import React, { useState, createContext } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Photos from "./components/Photos";
import PhotoForm from "./components/PhotoForm";
import Register from "./components/Register";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import Authentication from "./components/Authentication";

function App() {
  return (
    <div className="App">
      <CssBaseline />

      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route exact path="/" element={<Photos />} />
          </Route>
          <Route exact path="/auth" element={<Authentication />} />
       

          {/*
            <Route exact path="/" render={props => <Photos />} />
            <Route exact path="/photos" render={props => <Photos />} />
            <Route exact path="/photos/new" render={props => <PhotoForm {...props} />} />
            <Route exact path="/logout" render={props => <Logout {...props} logout={() => setIsLogged(false)} /> } />
              <Switch>
              <Route exact path="/*" render={props => <Login {...props} login={() => setIsLogged(true)} />} />
            
            </Switch>
          */}
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
