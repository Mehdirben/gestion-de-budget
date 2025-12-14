# Authentication & Budget Management System

A full-stack application with user authentication and budget management using React, Node.js, Express, MongoDB, bcrypt, and JWT.

## Features

### Authentication

- User registration with password hashing (bcrypt)
- User login with JWT authentication
- Protected routes
- Token-based authentication

### Budget Management (CRUD)

- ➕ Add income and expense entries
- 📋 View all transactions with stats
- ✏️ Edit existing entries
- 🗑️ Delete entries
- 📊 Real-time statistics (total income, expenses, balance)
- 📁 Categorized transactions

## Tech Stack

### Backend

- Node.js & Express.js
- MongoDB with Mongoose
- bcryptjs for password hashing
- jsonwebtoken for authentication

### Frontend

- React 18
- React Router DOM v6
- Axios for API calls
- Modern CSS styling

## Project Structure

```
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── budgetController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── Budget.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── budget.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Dashboard.js
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   ├── PrivateRoute.js
    │   │   ├── BudgetList.js
    │   │   └── BudgetForm.js
    │   ├── services/
    │   │   ├── authService.js
    │   │   └── budgetService.js
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    └── package.json
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB installed and running locally, or MongoDB Atlas account

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Update .env with your configuration
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |

### Budget Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/budget` | Get all budget entries | Yes |
| POST | `/api/budget` | Create new entry | Yes |
| PUT | `/api/budget/:id` | Update entry | Yes |
| DELETE | `/api/budget/:id` | Delete entry | Yes |
| GET | `/api/budget/stats` | Get budget statistics | Yes |

### Budget Entry Schema

```json
{
  "title": "Salaire",
  "amount": 2000,
  "type": "income",
  "category": "salary",
  "description": "Monthly salary",
  "date": "2024-01-15"
}
```

**Categories disponibles:**

- Revenus: `salary`, `freelance`, `investment`
- Dépenses: `food`, `transport`, `housing`, `utilities`, `entertainment`, `health`, `education`, `shopping`, `other`

## Usage

1. Start both backend and frontend servers
2. Navigate to `http://localhost:3000`
3. Register a new account or login
4. Access the dashboard
5. Click "Gestion de Budget" to manage your budget
6. Add income and expenses, view statistics
