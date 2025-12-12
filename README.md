# Authentication System

A full-stack authentication system with login and register functionality using React, Node.js, Express, MongoDB, bcrypt, and JWT.

## Features

- User registration with password hashing (bcrypt)
- User login with JWT authentication
- Protected routes
- User dashboard
- Token-based authentication
- Modern React UI with responsive design

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- bcryptjs for password hashing
- jsonwebtoken for authentication
- CORS enabled

### Frontend
- React 18
- React Router DOM v6
- Axios for API calls
- Modern CSS styling

## Project Structure

```
├── backend/
│   ├── controllers/
│   │   └── authController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── auth.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Dashboard.js
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   └── PrivateRoute.js
    │   ├── services/
    │   │   └── authService.js
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    ├── .env.example
    └── package.json
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB installed and running locally, or MongoDB Atlas account

### Backend Setup

1. Navigate to the backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file by copying `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/auth-db
JWT_SECRET=your_secret_key_here_change_in_production
JWT_EXPIRE=7d
```

5. Make sure MongoDB is running on your system

6. Start the backend server:
```bash
npm start
```
Or for development with auto-restart:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (optional):
```bash
cp .env.example .env
```

4. Start the React development server:
```bash
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

### Request Examples

**Register:**
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Login:**
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Get Current User:**
```
GET /api/auth/me
Headers: {
  "Authorization": "Bearer <token>"
}
```

## Features Explained

### Password Security
- Passwords are hashed using bcrypt with salt rounds of 10
- Passwords are never stored in plain text
- Password comparison is done using bcrypt's secure comparison

### JWT Authentication
- JWT tokens are generated upon login/register
- Tokens expire after 7 days (configurable)
- Tokens are stored in localStorage on the client
- Protected routes verify token validity

### React Components

- **Login**: User login form
- **Register**: User registration form
- **Dashboard**: Protected user dashboard showing user info
- **PrivateRoute**: HOC for protecting routes that require authentication

## Usage

1. Start both backend and frontend servers
2. Navigate to `http://localhost:3000`
3. Register a new account
4. Login with your credentials
5. Access the protected dashboard
6. Logout when done

## Security Notes

- Change `JWT_SECRET` in production to a strong, random string
- Use HTTPS in production
- Consider adding rate limiting for login/register endpoints
- Add input validation and sanitization
- Implement refresh tokens for better security
- Use environment variables for sensitive data

## Future Enhancements

- Email verification
- Password reset functionality
- Refresh tokens
- Remember me functionality
- User profile updates
- Password strength requirements
- Rate limiting
- Account lockout after failed attempts

## License

MIT
