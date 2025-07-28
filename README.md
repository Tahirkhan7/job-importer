# Job Importer - Scalable Queue-Based Job Feed Processor

This is a full-stack MERN application that imports job feeds from external XML APIs into MongoDB, using Redis queues and BullMQ for background processing. Includes a frontend admin UI for viewing import logs.

---

## Tech Stack

**Backend:**
- Express.js
- MongoDB + Mongoose
- Redis + Bull
- Axios
- XML2JS

**Frontend:**
- React (Vite)
- Axios

**Infra:**
- Redis (local or Redis Cloud)
- MongoDB (local or Atlas)
- Deployment-ready for Vercel/Render

---

## How to Install Backend

---

### 1. Clone the repo

git clone https://github.com/your-username/job-importer.git
cd job-importer
cd server
npm install

### 2. Add your .env

PORT=5000
MONGO_URI=mongodb://localhost:27017/job_importer
REDIS_URL=redis://127.0.0.1:6379
CONCURRENCY=5
BATCH_SIZE=20

### 3. Run the Backend

Run server:  npm run dev
Run background worker: npm run worker


## How to Install Frontend

---

### 1. Go to the repo

cd ../client
npm install

### 2. Add your .env

VITE_API_BASE_URL=http://localhost:5000/api

### 3. Run the Backend

npm run dev