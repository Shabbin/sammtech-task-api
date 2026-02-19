# 🗂️ Task Management REST API

Backend Developer Intern technical task for **SammTech Ltd**.

A Task Management REST API built with:

- **Node.js (Express)**
- **PostgreSQL**
- **Prisma ORM**

## ✨ Features

- 🔐 JWT Authentication (Register/Login)
- 📝 Task CRUD (Create, Read, Update, Delete)
- 👤 Ownership enforcement (users can only access their own tasks)
- ✅ Validation with clean error responses
- 📄 Pagination and filtering
- 📘 Swagger API documentation

---

# 🛠️ Tech Stack

- Node.js + Express.js
- PostgreSQL (Docker)
- Prisma ORM
- JWT (`jsonwebtoken`)
- bcrypt (password hashing)
- Zod (validation)
- Swagger (`swagger-ui-express`, `swagger-jsdoc`)

---

# 📁 Project Structure


src/
│
├── config/
│ ├── prisma.js
│ └── swagger.js
│
├── controllers/
├── middlewares/
├── routes/
├── services/
├── utils/
├── validators/
│
prisma/
postman/


---

# 🚀 Setup Instructions

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/Shabbin/sammtech-task-api.git
cd samtech-task-api
2️⃣ Install Dependencies
npm install
3️⃣ Create Environment File

Create a .env file in the project root:

PORT=4000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/taskdb?schema=public"
JWT_SECRET="your_secret_key"
JWT_EXPIRES_IN="7d"
4️⃣ Start PostgreSQL (Docker)
docker compose up -d
5️⃣ Run Prisma Migrations
npx prisma migrate dev
6️⃣ Generate Prisma Client
npx prisma generate
7️⃣ Run the Server
npm run dev
❤️ Health Check
GET http://localhost:4000/health
📘 API Documentation (Swagger)

Swagger UI is available at:

http://localhost:4000/api/docs
🔐 Authentication
📝 Register

POST /api/auth/register

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
🔑 Login

POST /api/auth/login

{
  "email": "test@example.com",
  "password": "password123"
}

Both endpoints return a JWT token.

Use Token in Requests
Authorization: Bearer <token>
📋 Task Endpoints (Authenticated)
➕ Create Task

POST /api/tasks

{
  "title": "Finish assignment",
  "description": "Implement CRUD endpoints",
  "status": "pending",
  "dueDate": "2026-03-01T10:00:00.000Z"
}
📄 Get All Tasks (Pagination + Filter)

GET

/api/tasks?page=1&limit=10&status=pending
🔍 Get Task by ID

GET

/api/tasks/:id
✏️ Update Task

PATCH

/api/tasks/:id
{
  "status": "completed"
}
❌ Delete Task

DELETE

/api/tasks/:id
✅ Validation & Business Rules

title is required

dueDate must be a future date

Users cannot access or modify other users’ tasks (ownership enforced)

📬 Postman Collection

A ready-to-use Postman collection is included:

postman/SammTech-Task-API.postman_collection.json

(Optional environment file if included)

postman/Local-Dev.postman_environment.json
Import into Postman and Set:
baseUrl = http://localhost:4000

The login request automatically saves the JWT token into token.