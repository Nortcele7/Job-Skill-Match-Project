import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { register, login, logout, getMe } from "../services/auth.api";


export const useAuth = () => {

    const context = useContext(AuthContext)

    const {user, setUser, loading, setLoading} = context

    const handleLogin = async({email, password})=> {
        setLoading(true)

        try{

            const data = await login({email, password})    // The respone will be stored in data

            // We also send data of our user from backend 
            setUser(data.user)
        }
        catch(err)
        {

        }
        finally{
            setLoading(false)
        }

    }

    const handleRegister = async({username, email, password}) => {
        setLoading(true)

        try{

        const data = await register({username, email, password})

        setUser(data.user)
        }
        catch(err)
        {

        }
        finally{
        setLoading(false)
        }
    }

    const handleLogout = async() => {

        setLoading(true);

        try{
        const data = data.user

        setUser(null)
        }
        catch(err)
        {

        }
        finally{
        setLoading(false)
        }

    }


    return {user, loading, handleLogin, handleRegister, handleLogout}

}