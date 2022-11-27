import React, {createContext, useState} from 'react'
import Cookies from "js-cookie"
import Layout  from "../components/Layout"

const UserContext = createContext()

const UserProvider = (props) => {
    // Context state

    const [user, setUser] = useState(JSON.parse(Cookies.get('user')))
     
    return (

        <UserContext.Provider value={{user,setUser}}>
          <Layout>
            {props.children}
          </Layout>
          
        </UserContext.Provider>
    )
}
  
export {UserProvider} 
export default  UserContext