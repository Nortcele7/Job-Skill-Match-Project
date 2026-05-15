// require("dotenv").config()
// const {GoogleGenAI} = require("@google/genai")
// const { z } = require("zod")
// const { zodToJsonSchema } = require("zod-to-json-schema")

// const ai = new GoogleGenAI({
//     apiKey: process.env.GOOGLE_GENAI_API_KEY
// });

// // Generating Structured Outputs

// const interviewReportSchema = z.object({
//     matchScore: z.number().describe("The match score between the candidate and the job describe on the basis of the resume or self describe provided by the candidate").min(0).max(100),

//     technicalQuestions: z.array(z.object({
//         question: z.string().describe("The technical question that can be asked during the interview"),
//         intention: z.string().describe("The intention of the interviewer behind the technical question"),
//         answer: z.string().describe("How to answer this question, what points to cover and what points to avoid while answering this question?")
//     })).describe("A list of technical questions that can be asked during the interview along with the intention of the interviewer behind those questions and how to answer those questions"),

//     behaviouralQuestions: z.array(z.object({
//         question: z.string().describe("The behavioural question that can be asked during the interview"),
//         intention: z.string().describe("The intention of the interviewer behind the behavioural question"),
//         answer: z.string().describe("How to answer this question, what points to cover and what points to avoid while answering this question?")
//     })).describe("A list of behavioural questions that can be asked during the interview along with the intention of the interviewer behind those questions and how to answer those questions"),

//     skillGaps: z.array(z.object({
//         skill: z.string().describe("The skill in which the candidate is lacking"),
//         severity: z.enum(["low", "medium", "high"]).describe("The severity of the skill gap")
//     })).describe("A list of skills in which the candidate is lacking along with the severity of those skill gaps").describe("A list of skill gaps that the candidate has and the severity of those skill gaps"),

//     preparationPlan: z.array(z.object({
//         day: z.number().describe("The day number of the preparation plan"),
//         focus: z.string().describe("The main focus of the preparation plan for that day"),
//         tasks: z.array(z.string()).describe("The list of tasks to be done on that day as part of the preparation plan")
//     })).describe("A day-wise preparation plan for the candidate to prepare for the interview")
// })

// async function generateInterviewReport({jobdescription, resume, selfdescription})
// {

//     const prompt = `You are an expert career counselor and you have to generate an interview report for a candidate based on the jobdescription: ${jobdescription}, resume: ${resume} and selfdescription: ${selfdescription} provided by the candidate. The interview report should contain the following:`

//     const response = await ai.models.generateContent({
//         model: "gemini-2.5-flash",
//         contents: prompt,
//         config:{
//             responseMimeType: "application/json",
//             responseSchema: zodToJsonSchema(interviewReportSchema)
//         }
//     })

//     console.log(JSON.parse(response.text))
// }

// module.exports = { generateInterviewReport }

require("dotenv").config();
const { GoogleGenAI, Type } = require("@google/genai"); // Import 'Type' from the SDK

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

// Define the schema using the native Type system
const interviewReportSchema = {
    type: Type.OBJECT,
    properties: {
        matchScore: {
            type: Type.INTEGER,
            description: "The match score between the candidate and the job described on the basis of the resume or self description provided by the candidate."
        },
        technicalQuestions: {
            type: Type.ARRAY,
            description: "A list of technical questions that can be asked during the interview along with the intention of the interviewer behind those questions and how to answer them.",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING, description: "The technical question that can be asked during the interview" },
                    intention: { type: Type.STRING, description: "The intention of the interviewer behind the technical question" },
                    answer: { type: Type.STRING, description: "How to answer this question, what points to cover and what points to avoid" }
                },
                required: ["question", "intention", "answer"]
            }
        },
        behaviouralQuestions: {
            type: Type.ARRAY,
            description: "A list of behavioural questions that can be asked during the interview along with the intention of the interviewer behind those questions and how to answer them.",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING, description: "The behavioural question that can be asked during the interview" },
                    intention: { type: Type.STRING, description: "The intention of the interviewer behind the behavioural question" },
                    answer: { type: Type.STRING, description: "How to answer this question, what points to cover and what points to avoid" }
                },
                required: ["question", "intention", "answer"]
            }
        },
        skillGaps: {
            type: Type.ARRAY,
            description: "A list of skill gaps that the candidate has and the severity of those skill gaps",
            items: {
                type: Type.OBJECT,
                properties: {
                    skill: { type: Type.STRING, description: "The skill in which the candidate is lacking" },
                    severity: { 
                        type: Type.STRING, 
                        enum: ["low", "medium", "high"], 
                        description: "The severity of the skill gap" 
                    }
                },
                required: ["skill", "severity"]
            }
        },
        preparationPlan: {
            type: Type.ARRAY,
            description: "A day-wise preparation plan for the candidate to prepare for the interview",
            items: {
                type: Type.OBJECT,
                properties: {
                    day: { type: Type.INTEGER, description: "The day number of the preparation plan" },
                    focus: { type: Type.STRING, description: "The main focus of the preparation plan for that day" },
                    tasks: { 
                        type: Type.ARRAY, 
                        items: { type: Type.STRING },
                        description: "The list of tasks to be done on that day" 
                    }
                },
                required: ["day", "focus", "tasks"]
            }
        }
    },
    required: ["matchScore", "technicalQuestions", "behaviouralQuestions", "skillGaps", "preparationPlan"]
};

async function generateInterviewReport({ jobdescription, resume, selfdescription }) {
    const prompt = `You are an expert career counselor and you have to generate an interview report for a candidate based on the jobdescription: ${jobdescription}, resume: ${resume} and selfdescription: ${selfdescription} provided by the candidate.`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: interviewReportSchema // Pass the clean schema object
        },
    });

    return JSON.parse(response.text)

    const report = JSON.parse(response.text);
console.log(JSON.stringify(report, null, 2));
}

module.exports = { generateInterviewReport };