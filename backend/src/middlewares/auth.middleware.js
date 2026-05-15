const jwt = require("jsonwebtoken")
const tokensBlacklistModel = require("../models/blacklist.model")

async function authUser(req, res, next)
{
    const token = req.cookies.token


    // As there is no token we can't authenticate the user
    if(!token)
    {
        return res.status(401).json({
            message:"Token not provided"
        })
    }

    // Checking if the token is blacklisted or not

    const isTokenBlacklisted = await tokensBlacklistModel.findOne({token})

    if(isTokenBlacklisted)
    {
        return res.status(401).json({
            message:"Invalid token"
        })
    }

    // If token is true then it will be stored in decoded

    // If token is expired jwt.verify() throws and error so we will use try catch

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded

        next()

    }catch(err)
    {
        return res.status(401).json({
            message:"Invalid Token"
        })
    }


}

module.exports = {authUser}


