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

    console.log(req.file)
    console.log(req.body)

    const pdfData = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
    const resumeContent = pdfData.text

    const {jobDescription, selfDescription} = req.body

    const interviewReportByAI = await generateInterviewReport({
        resume: resumeContent,
        selfDescription,
        jobDescription
    })

    const interviewReport = await interviewReportModel.findOneAndUpdate(
      { user: req.user.id },
      {
        $set: {
          resume: resumeContent,
          selfDescription,
          jobDescription,
          ...interviewReportByAI
        }
      },
      {
        new: true,
        upsert: true
      }
    )

    res.status(201).json({
        message:"Interview Report generated successfully",
        interviewReport
    })

}


module.exports = {generateInterviewReportController}