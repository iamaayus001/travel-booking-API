# Tour Booking API

A robust RESTful API built with Node.js, Express, and MongoDB for managing tour bookings with advanced features including JWT authentication, role-based authorization, and complex data aggregations.

## 📋 Table of Contents

- [Features](#-features)
- [Technologies](#-technologies)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
- [Database Models](#-database-models)
- [Security Features](#-security-features)
- [Future Enhancements](#-future-enhancements)

## ✨ Features

### Authentication & Authorization
- **JWT-based authentication** with secure token generation
- **Role-based access control** (user, guide, lead-guide, admin)
- Password encryption using bcrypt
- Token expiration and validation
- Password change detection and re-authentication

### Advanced Query Features
- **Filtering**: Support for MongoDB operators (gte, gt, lte, lt)
- **Sorting**: Multi-field sorting with custom order
- **Field limiting**: Select specific fields to optimize responses
- **Pagination**: Efficient data pagination with page and limit parameters
- **Aliasing**: Pre-configured query shortcuts (e.g., top-5-cheap tours)

### Data Aggregation
- Tour statistics by difficulty level
- Monthly tour planning with date-based aggregation
- Custom aggregation pipelines for business insights

### Error Handling
- Centralized error handling middleware
- Environment-specific error responses (dev/prod)
- Custom operational errors
- Async error wrapper for clean code
- Uncaught exception and unhandled rejection handlers

## 🛠️ Technologies

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose ODM

**Authentication & Security:**
- JSON Web Tokens (JWT)
- bcrypt.js for password hashing
- Validator.js for input validation

**Development Tools:**
- ESLint for code quality
- Morgan for HTTP request logging
- Nodemon for development server
- dotenv for environment management

## 🏗️ Architecture

```
├── controllers/         # Request handlers and business logic
│   ├── authController.js       # Authentication logic
│   ├── errorController.js      # Global error handling
│   ├── tourController.js       # Tour CRUD operations
│   └── userController.js       # User management
├── models/             # Mongoose schemas and models
│   ├── tourModel.js           # Tour schema with validations
│   └── userModel.js           # User schema with auth methods
├── routes/             # API route definitions
│   ├── tourRoutes.js          # Tour endpoints
│   └── userRoutes.js          # User & auth endpoints
├── utils/              # Utility functions and classes
│   ├── apiFeatures.js         # Query feature class
│   ├── appError.js            # Custom error class
│   └── catchAsync.js          # Async error wrapper
├── dev-data/           # Sample data and scripts
│   └── data/
│       ├── import-dev-data.js # Data seeding script
│       └── tours-simple.json  # Sample tour data
├── app.js              # Express app configuration
├── server.js           # Server initialization
└── config.env          # Environment variables
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher recommended)
- **MongoDB** (local instance or MongoDB Atlas)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tour-booking-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `config.env` file in the root directory:
   ```env
   NODE_ENV=development
   PORT=3000
   
   # Database
   DATABASE=mongodb+srv://username:<db_password>@cluster.mongodb.net/tours?retryWrites=true&w=majority
   DATABASE_PASSWORD=your_database_password
   
   # JWT
   JWT_SECRET=your-super-secret-jwt-key-min-32-characters
   JWT_EXPIRES_IN=90d
   ```

4. **Import sample data** (optional)
   ```bash
   node dev-data/data/import-dev-data.js --import
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:3000`

### Production Mode

```bash
npm start
```

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api/v1
```

### Authentication Endpoints

#### Sign Up
```http
POST /users/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "passwordConfirm": "password123"
}
```

**Response:**
```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  }
}
```

#### Login
```http
POST /users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Tour Endpoints

#### Get All Tours (with filtering)
```http
GET /tours?duration[gte]=5&difficulty=easy&sort=-price&fields=name,duration,price&page=1&limit=10
Authorization: Bearer <your_token>
```

**Query Parameters:**
- `duration[gte]=5` - Filter tours with duration >= 5 days
- `difficulty=easy` - Filter by difficulty
- `sort=-price` - Sort by price (descending)
- `fields=name,duration,price` - Limit returned fields
- `page=1&limit=10` - Pagination

#### Get Single Tour
```http
GET /tours/:id
Authorization: Bearer <your_token>
```

#### Create Tour
```http
POST /tours
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "name": "The Forest Hiker",
  "duration": 5,
  "maxGroupSize": 25,
  "difficulty": "easy",
  "price": 397,
  "summary": "Breathtaking hike through the forest",
  "description": "Detailed tour description...",
  "startDates": ["2024-06-01", "2024-08-15"]
}
```

#### Update Tour
```http
PATCH /tours/:id
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "price": 450,
  "maxGroupSize": 30
}
```

#### Delete Tour (Admin/Lead-Guide only)
```http
DELETE /tours/:id
Authorization: Bearer <your_token>
```

#### Get Tour Statistics
```http
GET /tours/tour-stats
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "stats": [
      {
        "_id": "EASY",
        "numTours": 5,
        "numRatings": 145,
        "avgRating": 4.7,
        "avgPrice": 397,
        "minPrice": 297,
        "maxPrice": 497
      }
    ]
  }
}
```

#### Get Monthly Plan
```http
GET /tours/monthly-plan/2024
```

#### Top 5 Cheap Tours (Aliased Route)
```http
GET /tours/top-5-cheap
```

### User Endpoints

#### Get All Users
```http
GET /users
```

## 💾 Database Models

### Tour Model

```javascript
{
  name: String (required, unique, 10-40 chars),
  slug: String (auto-generated),
  duration: Number (required),
  maxGroupSize: Number (required),
  difficulty: String (enum: easy/medium/difficult),
  ratingsAverage: Number (1-5, default: 4.5),
  ratingsQuantity: Number (default: 0),
  price: Number (required),
  priceDiscount: Number (validated < price),
  summary: String,
  description: String,
  startDates: [Date],
  secretTour: Boolean (default: false),
  createdAt: Date (auto-generated),
  
  // Virtual Property
  durationWeeks: Number (calculated from duration)
}
```

### User Model

```javascript
{
  name: String (required),
  email: String (required, unique, validated),
  password: String (required, min: 8, encrypted),
  passwordConfirm: String (required, not stored),
  passwordChangedAt: Date,
  role: String (enum: user/guide/lead-guide/admin, default: user)
}
```

**User Methods:**
- `correctPassword(candidatePassword, userPassword)` - Compare passwords
- `changedPasswordAfter(JWTTimestamp)` - Check if password changed after token issued

## 🔒 Security Features

- **Password Encryption**: Bcrypt hashing with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Role-Based Authorization**: Restrict routes by user roles
- **Input Validation**: Mongoose validators and validator.js
- **Error Handling**: No sensitive data leaked in production errors
- **Password Confirmation**: Validation at schema level
- **Token Expiration**: Automatic token invalidation
- **Protected Routes**: Middleware-based route protection

## 🔮 Future Enhancements

### Planned Features
- [ ] Password reset functionality with email tokens
- [ ] Email verification for new accounts
- [ ] Refresh token implementation
- [ ] Rate limiting for API endpoints
- [ ] Input sanitization against NoSQL injection
- [ ] HTTP security headers (Helmet.js)
- [ ] Reviews and ratings system
- [ ] Booking management system
- [ ] Image upload functionality
- [ ] Geospatial queries for tour locations
- [ ] Advanced search with full-text search
- [ ] API documentation with Swagger/Postman
- [ ] Unit and integration tests
- [ ] Payment integration (Stripe)
- [ ] Email notifications with Nodemailer

### Potential Improvements
- Implement caching with Redis
- Add WebSocket support for real-time updates
- Create admin dashboard
- Build GraphQL API alongside REST
- Implement microservices architecture
- Add comprehensive logging system
- Deploy with Docker containerization

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📝 License

This project is [MIT](LICENSE) licensed.

## 👨‍💻 Author

**Aayush**

---

⭐ Star this repository if you find it helpful!