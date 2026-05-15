import React, { useState } from 'react'
import "../../auth/auth.from.scss"
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'

const Login = () => {

    const {loading, handleLogin} = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async(e) => {
        e.preventDefault()
        await handleLogin({email, password})
        // Now the API call and all the loading logic and login logic is handled in state and api layer 
        // So our UI is clean and there is no any business logic written in UI

        navigate("/")
        


    }

    if (loading) {
  return (
    <div className="full-page-loader">
      <div className="spinner"></div>
      Loading
    </div>
  )
}


  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>

            <div className="input-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder='Enter email address'
                    onChange={(e)=>{setEmail(e.target.value)}}
                />
            </div>

            <div className="input-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder='Enter password'
                    onChange={(e)=>{setPassword(e.target.value)}}
                />
            </div>

            <button type="submit" className='button primary-button'>
                Login
            </button>   

            </form>
        </div>
    </main>
  )
}

export default Login