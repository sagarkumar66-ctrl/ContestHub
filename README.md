Contest Platform
📌 Overview
This is a Contest Management System where admins can create contests, upload questions, and manage participants. Users can register, participate in contests, and submit solutions. The platform includes automated grading, leaderboards, and a practice section.
🚀 Features
🔹 Admin Features
Secure Login (JWT Authentication)
Create & Manage Contests (Edit/Delete Contests)
Upload Questions (Coding & MCQs)
Set Question Marks & Difficulty Level
Manage Users (Lock/Remove Users)
🔹 User Features
Register & Get a Unique Registration ID
Join Contests Using Registration ID
Submit Solutions (Auto-Graded via API)
View Leaderboard & Performance Stats
Practice Section for Learning
🔹 Contest System
Contest Categories: Weekly Challenge, Algorithm Sprint, Code Masters Cup
Contest Status: Upcoming, Live, Closed
Multiple Rounds (For Code Masters Cup)
⚙️ Tech Stack
Frontend: HTML, CSS, JavaScript, React.js
Backend: Node.js, Express.js
Database: MongoDB (Mongoose ORM)
Authentication: JWT (JSON Web Token), Firebase Auth
Code Execution API: Judge0
🛠️ Installation
1️⃣ Clone the Repository
bash
CopyEdit
git clone https://github.com/your-repo-name.git
cd contest-platform

2️⃣ Install Dependencies
bash
CopyEdit
npm install

3️⃣ Setup Environment Variables
Create a .env file and add:
ini
CopyEdit
PORT=5000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key

4️⃣ Run the Server
bash
CopyEdit
npm start

📌 API Endpoints
🔹 Authentication
POST /api/auth/register - User Registration
POST /api/auth/login - User Login
🔹 Contests
POST /api/contest/create - Create Contest (Admin)
GET /api/contest/all - Get All Contests
POST /api/contest/join/:contestId - Join Contest
🔹 Questions
POST /api/questions/add - Add Question (Admin)
GET /api/questions/:contestId - Get Contest Questions
🔹 Submissions
POST /api/submit/:contestId - Submit Code (Judge0 API)
GET /api/leaderboard/:contestId - View Leaderboard
🎯 Future Enhancements
Contest Discussion Forum
Live Chat Feature for Participants
Team Contests
🤝 Contributing
Feel free to open issues or submit pull requests for improvements!

