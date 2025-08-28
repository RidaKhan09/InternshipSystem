# InternshipSystem

A modern web-based Internship Management System designed to streamline the process of registering interns, managing internship programs, and tracking progress. Built using **MERN stack** (MongoDB, Express.js, React.js, Node.js) with Redux for state management.

---

## Features

- **Admin Panel**
  - Create, update, and delete internship programs.
  - Manage registered interns.
  - Assign interns to specific projects.
  - View analytics of ongoing internships.

- **Authentication**
  - Secure login for both admins.
  - Password encryption and role-based access control.

- **Notifications**
  - Email notifications for important updates.
  - Alerts for upcoming deadlines or tasks.

---

## Tech Stack

- **Frontend:** React.js, Redux, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Atlas or local)
- **Authentication:** JWT, bcryptjs
- **Deployment:** Heroku / Vercel (optional)

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/internship-system.git
   cd internship-system

2. Install dependencies for backend:

   cd backend
   npm install
   
4. Install dependencies for frontend:

  cd ../frontend
  npm install

5. Setup environment variables:

   MONGO_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret


