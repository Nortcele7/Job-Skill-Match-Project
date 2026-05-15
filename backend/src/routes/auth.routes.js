const {Router} = require("express")
const authController = require("../controllers/auth.controller")
const authMiddleware = require("../middlewares/auth.middleware")

const authRouter = Router()

/**
 * @route POST  /api/auth/register 
 * @description This will regsiter a new user
 */

authRouter.post("/register", authController.resgisterUserController)

authRouter.post("/login", authController.loginUserController)

authRouter.get("/logout", authController.logoutUserController)

// Get me API that tell us the information about user

authRouter.get("/get-me", authMiddleware.authUser, authController.getMeController)

module.exports = authRouter;