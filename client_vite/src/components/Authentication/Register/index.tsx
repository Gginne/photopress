import { useState } from 'react'

interface RegisterFormProps {
    onSubmit: (data: any) => void
}
const Register = ({onSubmit}: RegisterFormProps) => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConf, setPasswordConf] = useState("")

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        await onSubmit({username, email, password})
    }  
    
    return (
        <div style={{minWidth: "250px", maxWidth: "350px", margin: "auto", textAlign: "center"}}>
            <h1>Register</h1>
            <form method="POST" onSubmit={handleSubmit}>
                <div>
                    <input type='text' className='input' placeholder="Username" name="username" onChange={e => setUsername(e.target.value)}  value={username} />
                    
                </div>
                <div>
                    <input type='text' className='input' placeholder="Email" name="email" onChange={e => setEmail(e.target.value)}  value={email} />
                  
                </div>
                <div>
                    <input type='password' className='input' placeholder="Password" name="password" onChange={e => setPassword(e.target.value)}  value={password} />
                </div>
                <div>
                    <input type='password' className='input' placeholder="Confirm Password" name="passwordConf" onChange={e => setPasswordConf(e.target.value)}  value={passwordConf} />
                </div>
                <br></br>
                <div>
                    <button className='button bg-teal-500' type="submit">Register</button>
                </div>
              
            </form>
        </div>
    )
    
}
export default Register
