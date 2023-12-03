import { Route, Routes } from "react-router-dom";
import Photos from "./components/Photos";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import Authentication from "./components/Authentication";

function App() {
  return (
    <div className="App">


      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Photos />} />
          </Route>
          <Route path="/auth" element={<Authentication />} />
       

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
