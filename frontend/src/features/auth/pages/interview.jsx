import React, { useState } from 'react'

import "./interview.scss"

const Interview = () => {

    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const [resume, setResume] = useState(null)


  return (
    <>
    <form encType="multipart/form-data">

        <div id="input-class">
            Job Description: <input type="text" id="jobDescription" placeholder='Enter the job decription'
            onChange={(e)=>{setJobDescription(e.target.value)}}
        />
        </div>

        <div id="input-class">
            Resume: <input type="file" name="myfile" 
            onChange={(e)=>{setResume(e.target.files[0])}}    
        />
        </div>

        <div id="input-class">
            Self Description: <input type="text" id="selfDescription" placeholder='Enter the self decription'
            onChange={(e)=>{setSelfDescription(e.target.value)}}    
        />
        </div> 

        <button type='submit'>Get Information</button>


    </form>
    </>
  )
}

export default Interview