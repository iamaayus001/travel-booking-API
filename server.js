process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<db_password>',
  process.env.DATABASE_PASSWORD
);
const PORT = process.env.PORT || 3000;

let server;

mongoose
  .connect(DB)
  .then(() => {
    console.log('Database connected successfully ✅');
    server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} 🚀`);
    });
  })
  .catch((err) => {
    console.log('DB connection failed 💥');
    console.log(err);
    process.exit(1);
  });

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION 💥 Shutting down...');
  console.log(err.name, err.message);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received. Shutting down gracefully...');
  if (server) {
    server.close(() => {
      console.log('💥 Process terminated');
      // Optional: Close DB connection explicitly
      mongoose.connection.close(false, () => {
        console.log('💥 MongoDB connection closed');
        process.exit(0);
      });
    });
  }
});
