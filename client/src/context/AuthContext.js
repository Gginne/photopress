import React, {createContext, useState, useContext} from 'react'
import axios from 'axios';
import { getSessionStorage, setSessionStorage } from "../utils/storage";

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider = ({children}) => {
    // Context state

    const [currentUser, setCurrentUser] = useState(
      getSessionStorage("user", null)
    );

    const [accessToken, setAccessToken] = useState(
      getSessionStorage("access", null)
    );
  
  
    const login = async (email, password) => {
      try {
        
        const response = await axios.post("/api/login", {email, password});
   
        const { access, user } = response.data;
  
        setSessionStorage("access", access);
        setSessionStorage("user", user);

        setCurrentUser(user);
        setAccessToken(access)

      } catch (err) {
        console.log(err);
      }
    };
    
    const register = async (data) => {
      try {
        const response = await axios.post("/api/register", data);
  
        const { access, refresh, user } = response.data;
  
        setSessionStorage("access", access);
        setSessionStorage("refresh", refresh);
        setSessionStorage("user", user);
  
        setCurrentUser(user);
      } catch (err) {
        console.log(err);
      }
    };
  
    const logout = () => {
      sessionStorage.clear();
      setCurrentUser(null);
    };
  
    const value = {
      currentUser,
      accessToken,
      register,
      login,
      logout
    };
  
     
    return (

       <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
}
  
export {AuthProvider} 
export default  AuthContext