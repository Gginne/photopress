import React, {Component} from 'react'
import Cookies from "js-cookie"
import Layout  from "../components/Layout"

const UserContext = React.createContext()

class UserProvider extends Component {
    // Context state
    state = {
      user: JSON.parse(Cookies.get('user')),
      photos: []
    }
    
    // Method to update state
    setUser = (user) => {
      this.setState({user})
    }
  
    render() {
      const { children } = this.props
      const { user } = this.state
      const { setUser } = this
     
      return (
        <UserContext.Provider
          value={{
            user,
            setUser,
          }}
        >
          <Layout>
            {children}
          </Layout>
          
        </UserContext.Provider>
      )
    }
  }

export const UserConsumer = UserContext.Consumer
export {UserProvider} 
export default  UserContext