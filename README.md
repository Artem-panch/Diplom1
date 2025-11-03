# 🪑 Furniture Store — Full-Stack Web Application

A full-stack **furniture e-commerce website** built with:
- **Frontend:** React.js  
- **Backend:** Node.js + Express  
- **Database:** MySQL  
- **Containerization:** Docker & Docker Compose  

---

## 🚀 Features
- Display and filter furniture items  
- Add products to the shopping cart  
- Responsive and modern user interface  
- RESTful API communication between frontend and backend  

---

## 🧩 Project Structure
.
├── backend/ # Node.js (Express) backend
│ ├── server.js
│ ├── package.json
│ └── Dockerfile
│
├── frontend/ # React.js frontend
│ ├── src/
│ ├── public/
│ ├── package.json
│ └── Dockerfile
│
├── docker-compose.yml # Main Docker configuration
├── package.json # Root project config
└── node_modules/ # Installed dependencies -->

---

## ⚙️ Running the Project

### 1. 📥 Clone the repository

 git clone https://github.com/ <your-username>/ <your-repo-name>.git
cd <your-repo-name> 

#2. 🧩 Dependencies

node_modules folders are already included in frontend and backend,
so you don’t need to run npm install again.

#3. 🛠️ Build the project
Build backend:
cd backend
npm run build

Build frontend:
cd ../frontend
npm run build

Return to root:
cd ..


If your project doesn’t require a build step, you can skip this part and go straight to running.

#4. ▶️ Run the project
#Option 1 — Run manually (without Docker)

Open two terminals:

Backend:

cd backend
npm start


Frontend:

cd frontend
npm start


Then open:
👉 http://localhost:3000 — Frontend
👉 Backend runs on http://localhost:3001

#Option 2 — Run with Docker Compose

If you have Docker installed:

docker-compose up --build


This will automatically build and run both frontend and backend containers.

