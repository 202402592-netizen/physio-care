import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

import 'dotenv/config';
import app from './app.js';
import connectDB from './config/db.js';

// Connect to Database
connectDB();

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit1);
});