// import React, { useState } from 'react'
// import "../../ai/ai.form.scss"
// import { interviewPreparation } from '../services/interview.api'

// const Interview = () => {

//     const [jobDescription, setJobDescription] = useState("")
//     const [selfDescription, setSelfDescription] = useState("")
//     const [resume, setResume] = useState(null)

//     const [report, setReport] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);


//     const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     setLoading(true);
//     setError(null);

//     const res = await interviewPreparation({
//       jobDescription,
//       resume,
//       selfDescription
//     });

//     setReport(res.interviewReport);

//   } catch (err) {
//     setError("Failed to generate report");
//     console.log(err);
//   } finally {
//     setLoading(false);
//   }
// };







//   return (
//     <main>
//     <div className='form-container'>
//     <form onSubmit={handleSubmit} encType="multipart/form-data">

//         <div id="input-class">
//             Job Description: <input type="text" id="jobDescription" placeholder='Enter the job decription'
//             onChange={(e)=>{setJobDescription(e.target.value)}}
//         />
//         </div>

//         <div id="input-class">
//             Resume: <input type="file" name="resume" 
//             onChange={(e)=>{setResume(e.target.files[0])}}    
//         />
//         </div>

//         <div id="input-class">
//             Self Description: <input type="text" id="selfDescription" placeholder='Enter the self decription'
//             onChange={(e)=>{setSelfDescription(e.target.value)}}    
//         />
//         </div> 

//         <button type='submit'>Get Information</button>


//     </form>
//     </div>
//     </main>
//   )
// }

// export default Interview


import React, { useState } from "react";
import "../../ai/ai.form.scss";
import { interviewPreparation } from "../services/interview.api";

const NAV_SECTIONS = [
  { id: "technical",    label: "Technical Questions", icon: "⚙️"},
  { id: "behavioural",  label: "Behavioral Questions", icon: "◎" },
  { id: "roadmap",      label: "Roadmap",              icon: "↗" },
];

const Interview = () => {
  const [jobDescription, setJobDescription]   = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [resume, setResume]                   = useState(null);
  const [report, setReport]                   = useState(null);
  const [loading, setLoading]                 = useState(false);
  const [error, setError]                     = useState(null);
  const [activeSection, setActiveSection]     = useState("technical");
  const [openCards, setOpenCards]             = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      setReport(null);
      const res = await interviewPreparation({ jobDescription, selfDescription, resume });
      setReport(res.interviewReport);
      setActiveSection("technical");
    } catch (err) {
      setError("Failed to generate interview report");
    } finally {
      setLoading(false);
    }
  };

  const toggleCard = (id) =>
    setOpenCards((prev) => ({ ...prev, [id]: !prev[id] }));

  // ── INPUT VIEW ──────────────────────────────────────────────
  if (!report && !loading) {
    return (
      <main className="input-view">
        <div className="form-container">
          <h1>AI Interview Prep</h1>
          <p className="form-subtitle">Generate a personalised report in seconds</p>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="input-group">
              <label htmlFor="jd">Job Description</label>
              <input id="jd" type="text" placeholder="Paste the job description"
                value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} />
            </div>

            <div className="input-group">
              <label htmlFor="resume">Resume (PDF)</label>
              <input id="resume" type="file"
                onChange={(e) => setResume(e.target.files[0])} />
            </div>

            <div className="input-group">
              <label htmlFor="sd">Self Description</label>
              <input id="sd" type="text" placeholder="Briefly describe yourself"
                value={selfDescription} onChange={(e) => setSelfDescription(e.target.value)} />
            </div>

            <button type="submit" className="primary-button" disabled={loading}>
              {loading ? "Generating…" : "Get Report"}
            </button>
          </form>

          {error && <p className="error" style={{ marginTop: 16 }}>{error}</p>}
        </div>
      </main>
    );
  }

  // ── LOADING ─────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="app-shell">
        <nav className="nav-panel">
          <span className="nav-label">Sections</span>
          {NAV_SECTIONS.map((s) => (
            <span key={s.id} className="nav-item">
              <span className="nav-icon">{s.icon}</span>
              {s.label}
            </span>
          ))}
        </nav>
        <main className="content-panel">
          <p className="loading">AI is analysing your profile…</p>
        </main>
        <aside className="score-panel" />
      </div>
    );
  }

  // ── REPORT VIEW ─────────────────────────────────────────────
  const score = report?.matchScore ?? 0;
  const circumference = 2 * Math.PI * 46; // radius 46
  const offset = circumference - (score / 100) * circumference;

  const sectionMap = {
    technical:   report?.technicalQuestions   ?? [],
    behavioural: report?.behaviouralQuestions ?? [],
    roadmap:     report?.preparationPlan      ?? [],
  };

  const sectionLabel = {
    technical:   "Technical Questions",
    behavioural: "Behavioral Questions",
    roadmap:     "Roadmap",
  };

  const currentItems = sectionMap[activeSection] ?? [];

  return (
    <div className="app-shell">

      {/* ── LEFT NAV ── */}
      <nav className="nav-panel">
        <span className="nav-label">Sections</span>
        {NAV_SECTIONS.map((s) => (
          <span
            key={s.id}
            className={`nav-item ${activeSection === s.id ? "active" : ""}`}
            onClick={() => setActiveSection(s.id)}
          >
            <span className="nav-icon">{s.icon}</span>
            {s.label}
          </span>
        ))}
      </nav>

      {/* ── MAIN CONTENT ── */}
      <main className="content-panel">
        {error && <p className="error">{error}</p>}

        <div className="content-header">
          <h2>{sectionLabel[activeSection]}</h2>
        </div>

        {activeSection === "roadmap" ? (
          // Prep plan layout
          <div className="question-list">
            {currentItems.map((day, i) => (
              <div key={i} className={`question-card ${openCards[`roadmap-${i}`] ? "open" : ""}`}>
                <div className="question-header" onClick={() => toggleCard(`roadmap-${i}`)}>
                  <span className="q-num">Day {day.day}</span>
                  <span className="q-text">{day.focus}</span>
                  <span className="q-chevron">⌄</span>
                </div>
                {openCards[`roadmap-${i}`] && (
                  <div className="question-body">
                    <div className="answer-block">
                      <ul>
                        {day.tasks?.map((t, j) => <li key={j}>{t}</li>)}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          // Q&A layout
          <div className="question-list">
            {currentItems.map((q, i) => {
              const cardKey = `${activeSection}-${i}`;
              return (
                <div key={i} className={`question-card ${openCards[cardKey] ? "open" : ""}`}>
                  <div className="question-header" onClick={() => toggleCard(cardKey)}>
                    <span className="q-num">Q{i + 1}</span>
                    <span className="q-text">{q.question}</span>
                    <span className="q-chevron">⌄</span>
                  </div>
                  {openCards[cardKey] && (
                    <div className="question-body">
                      <div className="answer-block">
                        <span className="block-tag">Intent</span>
                        <p>{q.intention}</p>
                      </div>
                      <div className="answer-block">
                        <span className="block-tag">Answer</span>
                        <p>{q.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* ── RIGHT SCORE SIDEBAR ── */}
      <aside className="score-panel">
        <div className="score-block">
          <span className="score-heading">Match Score</span>
          <div className="score-ring-wrap">
            <div className="ring-outer">
              <svg width="110" height="110" viewBox="0 0 110 110">
                <defs>
                  <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ed903a" />
                    <stop offset="100%" stopColor="#a78bfa" />
                  </linearGradient>
                </defs>
                <circle cx="55" cy="55" r="46" fill="none" stroke="#1f2d47" strokeWidth="8" />
                <circle cx="55" cy="55" r="46" fill="none"
                  stroke="url(#scoreGrad)" strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                />
              </svg>
              <div className="ring-text">
                <span className="ring-number">{score}</span>
                <span className="ring-pct">%</span>
              </div>
            </div>
            <span className="ring-caption">
              {score >= 75 ? "Strong match for this role" : score >= 50 ? "Good match" : "Needs improvement"}
            </span>
          </div>
        </div>

        <div className="skill-block">
          <span className="skill-heading">Skill Gaps</span>
          <div className="skill-tags">
            {report?.skillGaps?.map((s, i) => (
              <span
                key={i}
                className={`skill-tag ${s.severity?.toLowerCase()}`}
              >
                {s.skill}
              </span>
            ))}
          </div>
        </div>
      </aside>

    </div>
  );
};

export default Interview;