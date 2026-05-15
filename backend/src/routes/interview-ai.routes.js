const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const interviewController = require("../controllers/interview.controller")
const upload = require("../middlewares/file.middlewares")


const interviewRouter = express.Router()


// First authenticate the user through authMiddleware and then if the user is authenticated then 
interviewRouter.post("/information",authMiddleware.authUser, upload.single("resume"), interviewController.generateInterviewReportController)


module.exports = interviewRouter