import axios from "axios"

// Shortening the reccurring code

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})


export async function register({username, email, password})
{

    try{
        const res = await axios.post("http://localhost:3000/api/auth/register",{
            username, email, password
        },{
            withCredentials: true
        }
      )

      return res.data

    }
    catch(err)
    {
        console.log(err)
        throw err
    }

}

export async function login({email, password})
{
    try{
        const res = await axios.post("http://localhost:3000/api/auth/login",{
            email, password
        }, {
            withCredentials: true
        }
    )

        return res.data
    }
    catch(err)
    {
        console.log(err)
        throw err

    }
}

export async function logout()
{
    try{
        const res = await api.get("/api/auth/logout")

        return res.data
    }
    catch(err)
    {
        console.log(err)
        throw err

    }
}

export async function getMe()
{
    try{
        const res = await api.get("/api/auth/get-me")

        return res.data
    }
    catch(err)
    {
        console.log(err)
        throw err

    }
}

