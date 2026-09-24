# 💰 Expense Tracker

A modern **Full-Stack Expense Tracker** built using **React, Node.js, Express, and MongoDB Atlas**. The application enables users to securely manage their income and expenses, visualize spending through interactive charts, and monitor their financial health with a responsive dashboard.

---

## 🚀 Live Demo

**Frontend:**  
https://expense-tracker-zeta-puce-44.vercel.app

**Backend API:**  
https://expense-tracker-lkp2.onrender.com

---

## 📂 GitHub Repository

https://github.com/ambujyadav19/expense_tracker

---

# ✨ Features

## 🔐 Authentication

- User Registration
- Secure Login
- JWT Authentication
- Protected Routes
- Logout Functionality
- Password Hashing using bcrypt

---

## 💸 Transaction Management

- Add Transactions
- Edit Transactions
- Delete Transactions
- Search Transactions
- Filter by Category
- Filter by Transaction Type
- Store Personal Transactions for Each User

---

## 📊 Dashboard

- Current Balance
- Total Income
- Total Expenses
- Total Transactions
- Recent Activity
- Financial Insights

---

## 📈 Data Visualization

- Monthly Income vs Expense Chart
- Category-wise Expense Distribution
- Income vs Expense Comparison Chart

---

## 📱 Responsive Design

- Mobile Friendly
- Tablet Friendly
- Desktop Optimized

---

# 🛠 Tech Stack

## Frontend

- React.js
- React Router DOM
- Vite
- CSS3
- Recharts

## Backend

- Node.js
- Express.js

## Database

- MongoDB Atlas
- Mongoose

## Authentication

- JWT (JSON Web Token)
- bcrypt

## Deployment

- Vercel
- Render

---

# 📂 Project Structure

```
expense_tracker/

│── public/
│
│── src/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
│
│── server/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── package.json
├── vite.config.js
├── vercel.json
└── README.md
```

---

# ⚙️ Installation

## Clone the Repository

```bash
git clone https://github.com/ambujyadav19/expense_tracker.git

cd expense_tracker
```

---

# Install Frontend Dependencies

```bash
npm install
```

---

# Start Frontend

```bash
npm run dev
```

---

# Backend Setup

Move into the server folder

```bash
cd server
```

Install dependencies

```bash
npm install
```

Run the backend

```bash
npm start
```

For development

```bash
npm run dev
```

---


# API Endpoints

## Authentication

| Method | Endpoint |
|---------|------------------|
| POST | /api/auth/signup |
| POST | /api/auth/login |

---

## Transactions

| Method | Endpoint |
|---------|---------------------------|
| GET | /api/transactions |
| POST | /api/transactions |
| PUT | /api/transactions/:id |
| DELETE | /api/transactions/:id |

---

# Authentication Flow

1. User creates an account.
2. Password is hashed using bcrypt.
3. User logs in.
4. Server generates a JWT.
5. Token is stored in Local Storage.
6. Protected routes require a valid JWT.
7. Logout removes the token and user data.

---

# Dashboard Features

- Current Balance
- Total Income
- Total Expenses
- Total Transactions
- Recent Transactions
- Monthly Financial Summary
- Spending Insights
- Interactive Charts

---

# Screenshots

# 📸 Screenshots

## 🏠 Dashboard

![Dashboard](Screenshots/Dashboard.png)

---

## 📊 Charts

![Charts](Screenshots/chsrts.png)

---

## 📈 Monthly Charts

![Monthly Charts](Screenshots/charts2.png)

---

## 💡 Financial Insights

![Financial Insights](Screenshots/Insights.png)

---

## 🔍 Transaction Filters

![Transaction Filters](Screenshots/filters.png)

---

## ➕ Add Transaction

![Add Transaction](Screenshots/image.png)





# Testing

✔ User Signup

✔ User Login

✔ JWT Authentication

✔ Protected Routes

✔ CRUD Operations

✔ Search Transactions

✔ Filter Transactions

✔ Dashboard Calculations

✔ Interactive Charts

✔ Responsive Design

✔ Logout Functionality

---

# Future Improvements

- 🌙 Dark Mode
- 📄 Export Transactions to PDF
- 📊 Export to Excel
- 🔔 Budget Alerts
- 📅 Recurring Transactions
- 👤 User Profile
- 📷 Receipt Upload
- 🌍 Multi-Currency Support

---

# Deployment

## Frontend

Hosted on **Vercel**

https://expense-tracker-zeta-puce-44.vercel.app

---

## Backend

Hosted on **Render**

https://expense-tracker-lkp2.onrender.com

---

## Database

Hosted on **MongoDB Atlas**

---

# Author

**Ambuj Yadav**

GitHub: https://github.com/ambujyadav19

Project Repository:

https://github.com/ambujyadav19/expense_tracker

---


## ⭐ If you found this project useful, please consider giving it a star on GitHub!
