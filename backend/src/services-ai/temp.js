const { JobState } = require("@google/genai");

const jobDescription = `
Job Title: MERN Stack Developer

Company Overview:
We are a fast-growing fintech startup focused on building scalable, user-friendly digital financial solutions for individuals and small businesses. Our team values clean code, ownership, and rapid iteration.

Role Overview:
We are looking for a MERN Stack Developer who can design, develop, and maintain full-stack web applications using MongoDB, Express.js, React.js, and Node.js. You will work closely with product managers, designers, and backend engineers to build high-performance features and APIs.

Responsibilities:
- Develop and maintain full-stack web applications using MERN stack
- Build RESTful APIs using Node.js and Express.js
- Design responsive and dynamic frontend interfaces using React.js
- Work with MongoDB for schema design and data modeling
- Optimize applications for performance, scalability, and security
- Collaborate with cross-functional teams to define and implement new features
- Debug and resolve production issues
- Write clean, maintainable, and well-documented code

Requirements:
- Strong proficiency in JavaScript (ES6+)
- Experience with React.js and state management (Context API / Redux)
- Hands-on experience with Node.js and Express.js
- Knowledge of MongoDB and Mongoose
- Understanding of REST APIs and authentication (JWT preferred)
- Familiarity with Git and version control workflows
- Basic understanding of deployment (Vercel, Netlify, or AWS)
- Good problem-solving and communication skills

Nice to Have:
- Experience with TypeScript
- Familiarity with Docker and CI/CD pipelines
- Exposure to cloud services (AWS / Firebase)
- Prior internship or project experience in full-stack development

`;

const resume = `
Aarav Sharma
MERN Stack Developer

Contact:
Email: aarav.sharma.dev@gmail.com
Phone: +977-98XXXXXXXX
Location: Bharatpur, Nepal
GitHub: github.com/aaravsharma
LinkedIn: linkedin.com/in/aaravsharma

Summary:
Motivated Full Stack Developer specializing in MERN stack development with hands-on experience building scalable web applications. Passionate about creating efficient backend systems and responsive frontend interfaces. Strong foundation in JavaScript, data structures, and API development.

Skills:
- Frontend: React.js, HTML5, CSS3, Tailwind CSS, JavaScript (ES6+)
- Backend: Node.js, Express.js, REST APIs, JWT Authentication
- Database: MongoDB, Mongoose
- Tools: Git, GitHub, Postman, VS Code
- Others: Basic TypeScript, Agile development, Deployment (Vercel, Render)

Projects:

1. Expense Tracker App (MERN)
- Built a full-stack expense tracking application with user authentication
- Implemented REST APIs for transactions and budgeting
- Used React for dynamic UI and MongoDB for data storage

2. Real-Time Chat Application
- Developed chat app using Socket.io and Node.js
- Enabled real-time messaging and online status tracking
- Implemented secure login using JWT

3. Task Management System
- Created a Kanban-style task manager using React and Express
- Implemented CRUD operations and user-specific task boards

Education:
Bachelor in Computer Engineering
Tribhuvan University, Pulchowk Campus

Certifications:
- Full Stack Web Development (MERN) - Online Course
- JavaScript Algorithms and Data Structures

`;

const selfDescription = `
I am a passionate MERN Stack Developer with a strong interest in building scalable and user-focused web applications. I enjoy working across the full stack, from designing intuitive user interfaces in React to building robust backend APIs with Node.js and Express.

I have experience working with MongoDB for database design and enjoy structuring data in a way that supports efficient and scalable applications. I am continuously improving my skills in system design, authentication workflows, and performance optimization.

Beyond technical skills, I value clean code, collaboration, and continuous learning. I actively work on personal projects to strengthen my understanding of real-world development practices, and I enjoy solving complex problems through logical thinking and debugging.

My goal is to grow as a full-stack engineer and contribute to impactful products that solve real user problems while continuously evolving with modern web technologies.
`;


module.exports = {
    jobDescription, resume, selfDescription
}