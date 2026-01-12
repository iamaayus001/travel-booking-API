const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Welcome route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      message: 'Welcome to the Tour Booking API 🌍',
      description: 'A robust API for booking and managing nature tours.',
      version: '1.0.0',
      documentation: 'https://github.com/iamaayus001/tour-booking-api',
      live_url: 'https://travel-booking-api-gf96.onrender.com',
      endpoints: {
        tours: {
          all_tours: '/api/v1/tours',
          top_5_cheap: '/api/v1/tours/top-5-cheap',
          tour_stats: '/api/v1/tours/tour-stats',
        },
        users: {
          login: 'POST /api/v1/users/login',
          signup: 'POST /api/v1/users/signup',
        },
      },
    },
  });
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
