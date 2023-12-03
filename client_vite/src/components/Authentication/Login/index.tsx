import { useState } from 'react';

interface LoginFormProps {
    onSubmit: (data: any) => void
}
const Login = ({onSubmit}: LoginFormProps) =>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        await onSubmit({email, password})
    }  

    return (
    
        <div style={{minWidth: "250px", maxWidth: "350px", margin: "auto", textAlign: "center"}}>
            <h1>Login</h1>
            <form method="POST" onSubmit={handleSubmit}>
                <div>
                    <input type='text' className='input' placeholder="Email" name="email" onChange={e => setEmail(e.target.value)}  value={email} />
                </div>
                <div>
                    <input type='password' className='input' placeholder="Password" name="password" onChange={e => setPassword(e.target.value)}  value={password} />
                </div>
                <br></br>
                <div>
                    <button className='button bg-teal-500' type="submit">Sign In</button>
                </div>
        
            </form>
              
        </div>
      
     
    )
}

    


export default Login;