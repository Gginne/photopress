import React, {createContext, useState, useContext} from 'react'
import axios from 'axios';
import { getSessionStorage, setSessionStorage } from "../utils/storage";


interface AuthContextType {
  currentUser: any, //Define a type for currentUser here
  accessToken: string,
  register: (data: any) => void;
  login: (data: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: React.ReactNode;
}
const AuthProvider = ({children} : AuthProviderProps ) => {
    // Context state

    const [currentUser, setCurrentUser] = useState(
      getSessionStorage("user", null)
    );

    const [accessToken, setAccessToken] = useState(
      getSessionStorage("access", null)
    );
  
  
    const login = async (data: any) => {
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
    
    const register = async (data: any) => {
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
  
    const logout = async () => {
      sessionStorage.clear();
      await axios.post("/api/logout");
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