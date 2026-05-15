import axios from "axios";

export async function interviewPreparation({
  jobDescription,
  resume,
  selfDescription,
}) {
  try {
    const formData = new FormData();

    formData.append("jobDescription", jobDescription);
    formData.append("selfDescription", selfDescription);
    formData.append("resume", resume);

    const res = await axios.post(
      "http://localhost:3000/api/interview/information",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}