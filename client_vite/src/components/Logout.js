import React, {useEffect} from 'react'
import Cookies from "js-cookie"

const Logout = (props) => {

    useEffect(() => {
        Cookies.remove("user")
        props.logout()
        props.history.push("/login")
    });
    
    return (
        <>
            <h1>Logout</h1>
        </>
    )
}


export default Logout