Dynamic Next.js Website with Express & MySQL
<img src="./Capture.png" alt="Website Screenshot" />

This is a fully dynamic website built with Next.js 16+ for the frontend and Express.js with a MySQL database for the backend.

The website features a single landing page with the following dynamic sections:

Hero Section

Middle Section

Team Section

FAQ Section

Blog Section

Footer

Everything on the page is dynamically fetched from the backend.

🛠 Tech Stack

Frontend: Next.js 16+

Backend: Express.js

Database: MySQL

Authentication: JWT

🚀 Getting Started

Follow these steps to run the project locally:

1. Clone the repository
git clone <your-repo-url>
cd <repo-folder>
2. Setup MySQL Database

Open phpMyAdmin or MySQL CLI.

Create a new database, e.g., aayumalun.

3. Configure Backend Environment

Create a .env file in the backend folder with the following:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=""
DB_NAME=aayumalun
PORT=4000
JWT_SECRET=""
4. Configure Frontend Environment

Create a .env file in the frontend folder with the following:

# Backend URLs
BASE_CONTENT_URL=http://localhost:4000/
NEXT_PUBLIC_BASE_CONTENT_URL=http://localhost:4000/

NEXT_PUBLIC_BASE_API=http://localhost:4000/api
BASE_API=http://localhost:4000/api
5. Run the Project
Backend:
cd backend
npm install
npm run dev
Frontend:
cd frontend
npm install
npm run dev

The frontend will be available at http://localhost:3000 by default.

🔐 Admin Panel

To log in to the admin panel:

Manually create a new user in the users table of the MySQL database.

Access the admin login page at:

http://localhost:3000/admin/login
📄 Features

Fully dynamic landing page content

Easy admin management

Blog section dynamically fetched from the backend

JWT-based authentication for admin panel

⚡ Notes

Make sure MySQL is running locally before starting the backend.

Ensure the .env variables match your local setup.