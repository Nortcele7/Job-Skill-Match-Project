const pdfParse = require("pdf-parse")
const {generateInterviewReport} = require("../../src/services-ai/ai.service")
const interviewReportModel = require("../models/interviewReport.model")

async function generateInterviewReportController(req, res)
{
    // We are gonna get 3 things from frontend
    /*
    1. Job Description: Text 
    2. Resume: PDF
    To handle the pdf or any other kind of files we need multer
    */

    const pdfData = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
    const resumeContent = pdfData.text

    const {jobDescription, selfDescription} = req.body

    const interviewReportByAI = await generateInterviewReport({
        resume: resumeContent,
        selfDescription,
        jobDescription
    })

    const interviewReport = await interviewReportModel.create({
        user:req.user.id,
        resume: resumeContent,
        selfDescription,
        jobDescription,
        ...interviewReportByAI  // destructure bhayesi hami lai chaini format ma aaucha as we have generated in the same format
    })

    res.status(201).json({
        message:"Interview Report generated successfully",
        interviewReport
    })

}


module.exports = {generateInterviewReportController}