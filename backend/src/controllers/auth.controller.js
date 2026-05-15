const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const tokensBlacklistModel = require("../models/blacklist.model")



// JS DOC Comment

/**
 * @name Regsiter User Controller 
 * @description This is register user Controller
 */

async function resgisterUserController(req, res)
{

    const {username, email, password} = req.body

    if(!username || !email || !password)
    {
        return res.status(400).json({
            message:"Empty field"
        })
    }

    // userModel.findOne({ $or: [{condition1}, {condition2}] })
    // This checks the userModel on the basis of condition1 and condition2 and returns the user

    const isUserAlreadyExists = await userModel.findOne({
        $or: [{username}, {email}]
    })

    if(isUserAlreadyExists)
    {
        return res.status(400).json({
            message:"User Already exists"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hash
    })

    const token = jwt.sign(
        {id: user._id, username: user.username},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    )

    res.cookie("token", token)

    res.status(201).json({
        message: "User registered successfully",
        user:{
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

}


async function loginUserController(req, res)
{
    const {email, password} = req.body

    console.log("login body:", req.body)

    const user = await userModel.findOne({email})

    if(!user)
    {
        return res.status(400).json(
            {
                message: "Invalid email or password"
            }
        )
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid)
    {
        return res.status(400).json(
            {
                message:"Invalid Email or Password"
            }
        )
    }

    const token = jwt.sign(
         {id: user._id, username: user.username},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    )

    res.cookie("token", token)

    res.status(200).json({
        message:"User LoggedIn successfully",
        user:{
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}


async function logoutUserController(req, res)
{
    const token = req.cookies.token

    if(token)
    {
        await tokensBlacklistModel.create({token})
    }

    res.clearCookie("token")

    res.status(200).json({
        message: "User logged out successfully"
    })
}


async function getMeController(req, res)
{

    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message:"User detailed fetched successfully",
        user:{
            id:user._id,
            username: user.username,
            email: user.email
        }
    })



}

module.exports = {
    resgisterUserController,
    loginUserController,
    logoutUserController,
    getMeController
}