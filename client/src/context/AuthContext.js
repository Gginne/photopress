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
  
  
    const login = async (data) => {
      try {
        
        const response = await axios.post("/api/login", data);
   
        const { access, user } = response.data;
        
        setCurrentUser(user);
        setAccessToken(access)
        
        setSessionStorage("access", access);
        setSessionStorage("user", user);

        

      } catch (err) {
        console.log(err);
      }
    };
    
    const register = async (data) => {
      try {
        
        const response = await axios.post("/api/register", data);
        console.log(response)
        const { access, user } = response.data;
  
        setSessionStorage("access", access);
        setSessionStorage("user", user);

        setCurrentUser(user);
        setAccessToken(access)
  
      } catch (err) {
        console.log(err);
      }
    };
  
    const logout = () => {
      sessionStorage.clear();
      setCurrentUser(null);
      setAccessToken(null);
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