## 📋 Project Overview
This is a fully functional E-Commerce website built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). It follows the Agile development methodology and features a complete shopping flow for customers alongside a robust dashboard for administrators.

### Key Features
* **User:** * Browse product catalog with dynamic details.
  * Manage Shopping Cart (add/remove/update quantities).
  * User Authentication (Register/Login) with JWT.
  * Secure Checkout process (Shipping & Payment).
* **Admin:** * User Management (View list).
  * Product Management (Create, Edit, Delete products).
  * Order Management (View all customer orders and status).
* **Security:** * Password Hashing (Bcrypt).
  * Protected API Routes.

---

## ⚙️ Prerequisites
Before running this project, ensure you have the following installed:
* **[Node.js](https://nodejs.org/)** (v14 or higher)
* **[MongoDB](https://www.mongodb.com/try/download/community)** (Locally running service)

---

## 🚀 Installation & Setup Guide

### 1. Backend Setup (Server)
Open a terminal in the root folder `ecommerce-platform/`:
```bash
cd server
npm install
````

### 2\. Frontend Setup (Client)

Open a **new** terminal in the root folder `ecommerce-platform/`:

```bash
cd client
npm install
```

### 3\. Environment Variables

Ensure a `.env` file exists inside the `server` folder with the following settings:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ecommerce_db
JWT_SECRET=supersecretkey123
```

### 4\. Database Seeding (Import Sample Data)

To populate the database with initial Products and the Admin Account, run this command in the **server** terminal:

```bash
# Make sure you are inside the /server folder
node seeder.js
```

*(Output should say "Data Imported\!")*

-----

## ▶️ How to Run the Application

You need to keep **two terminals** running simultaneously.

**Terminal 1: Backend (API)**

```bash
cd server
npx nodemon server.js
```

*Expected Output:* `Server running on port 5000` and `MongoDB Connected`.

**Terminal 2: Frontend (React UI)**

```bash
cd client
npm run dev
```

*Expected Output:* `Local: http://localhost:5173/`

**Open your browser and visit:** [http://localhost:5173](https://www.google.com/search?q=http://localhost:5173)

-----

## 🔑 Admin Credentials

Use this account to access the **Admin Dashboard** features:

  * **Email:** `admin@example.com`
  * **Password:** `123456`

-----

## 🛠️ Technology Stack

  * **Frontend:** React.js, Redux Toolkit, Tailwind CSS, Vite.
  * **Backend:** Node.js, Express.js.
  * **Database:** MongoDB, Mongoose.
  * **Tools:** Postman (API Testing), Git.

<!-- end list -->

```
```