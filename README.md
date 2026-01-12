# 🗺️ Travel Booking API

A RESTful API for managing tours with JWT authentication, role-based access control, and MongoDB aggregations.

**Live Demo:** [https://travel-booking-api-gf96.onrender.com](https://travel-booking-api-gf96.onrender.com)

**⚠️ Note:** The server is hosted on a free tier and sleeps after 15 minutes of inactivity. The first request may take 30-60 seconds to wake up.

## 📋 What's Included

- ✅ JWT authentication (signup/login)
- ✅ Password encryption with bcrypt
- ✅ Role-based access control (user, guide, lead-guide, admin)
- ✅ Advanced query features (filter, sort, pagination, field limiting)
- ✅ MongoDB aggregation pipelines
- ✅ Global error handling
- ✅ Sample data seeding script

## 🛠️ Tech Stack

- Node.js & Express.js
- MongoDB & Mongoose
- JWT & bcrypt
- Validator.js

## 🚀 Quick Start

### Prerequisites

- Node.js (v16+)
- MongoDB Atlas account or local MongoDB

### Installation

1. Clone the repo

   ```bash
   git clone https://github.com/iamaayus001/tour-booking-api.git
   cd tour-booking-api
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Create `config.env` in root directory

   ```env
   NODE_ENV=development
   PORT=8000
   DATABASE=mongodb+srv://username:<db_password>@cluster.mongodb.net/tourBooking
   DATABASE_PASSWORD=your_password
   JWT_SECRET=your-secret-key-min-32-characters
   JWT_EXPIRES_IN=90d
   ```

4. Import sample data (optional)

   ```bash
   node dev-data/data/import-dev-data.js --import
   ```

5. Start server
   ```bash
   npm run dev
   ```

## 📚 API Endpoints

### Public Routes (No Auth Required)

| Method | Endpoint                           | Description          |
| ------ | ---------------------------------- | -------------------- |
| GET    | `/`                                | API welcome message  |
| POST   | `/api/v1/users/signup`             | Create new account   |
| POST   | `/api/v1/users/login`              | Login & get token    |
| GET    | `/api/v1/tours/top-5-cheap`        | Top 5 cheapest tours |
| GET    | `/api/v1/tours/tour-stats`         | Tour statistics      |
| GET    | `/api/v1/tours/monthly-plan/:year` | Monthly plan         |

### Protected Routes (Requires Token)

| Method | Endpoint            | Description     | Access            |
| ------ | ------------------- | --------------- | ----------------- |
| GET    | `/api/v1/tours`     | Get all tours   | All authenticated |
| GET    | `/api/v1/tours/:id` | Get single tour | All authenticated |
| POST   | `/api/v1/tours`     | Create tour     | All authenticated |
| PATCH  | `/api/v1/tours/:id` | Update tour     | All authenticated |
| DELETE | `/api/v1/tours/:id` | Delete tour     | Admin, Lead-guide |
| GET    | `/api/v1/users`     | Get all users   | All authenticated |

## 🧪 Testing the API

### 1. Sign Up

```bash
POST /api/v1/users/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "test1234",
  "passwordConfirm": "test1234"
}
```

### 2. Login

```bash
POST /api/v1/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "test1234"
}
```

**Copy the token from response**

### 3. Get Tours (with authentication)

```bash
GET /api/v1/tours
Authorization: Bearer YOUR_TOKEN_HERE
```

### 4. Query Examples

```bash
# Filter tours (duration >= 5, easy difficulty)
GET /api/v1/tours?duration[gte]=5&difficulty=easy

# Sort by price (descending)
GET /api/v1/tours?sort=-price

# Select specific fields
GET /api/v1/tours?fields=name,duration,price

# Pagination
GET /api/v1/tours?page=2&limit=10

# Combine filters
GET /api/v1/tours?duration[gte]=5&difficulty=easy&sort=-price&page=1&limit=5
```

## 📁 Project Structure

```
├── controllers/         # Request handlers
├── models/             # Mongoose schemas
├── routes/             # API routes
├── utils/              # Helper functions
├── dev-data/           # Sample data & import script
├── app.js              # Express app
├── server.js           # Server entry point
└── config.env          # Environment variables
```

## 🔒 Security

- Passwords hashed with bcrypt (12 salt rounds)
- JWT tokens with expiration
- Role-based authorization middleware
- MongoDB injection protection via Mongoose
- Input validation with Validator.js

## 🌐 Deployment

Deployed on **Render** with **MongoDB Atlas**

**⚠️ Note:** Free tier sleeps after 15 min inactivity. First request may take 30-50 seconds.

## 💡 Future Improvements

- Password reset functionality
- Email verification
- Rate limiting
- Input sanitization
- Reviews & ratings system
- Booking system
- Image uploads
- Payment integration

## 👨‍💻 Author

**Aayush**  
GitHub: [@iamaayus001](https://github.com/iamaayus001)

---

⭐ Star this repo if you find it helpful!
