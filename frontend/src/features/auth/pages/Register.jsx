import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'

const Register = () => {

    const {loading, handleRegister} = useAuth()

    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async(e) => {
        e.preventDefault()
        await handleRegister({username, email, password})
        navigate("/login")
    }



  return (

     <main>
        <div className="form-container">
            <h1>Register</h1>

            <form  onSubmit={handleSubmit}>

            <div className="input-group">
                <label htmlFor="username">Username</label>
                <input type="username" id="username" placeholder='Enter username'
                    onChange={(e)=>{setUsername(e.target.value)}}
                />
            </div>

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

            <button type="submit" className='button primary-button' >Register</button>

            <div>
                Already a User. <a href="/login">Login</a>
            </div>


            </form>
        </div>
    </main>
  )
}

export default Register