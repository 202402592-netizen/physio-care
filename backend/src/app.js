import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import authRouter from './routes/authRoutes.js';
import mongoose from 'mongoose';

// Initialize express app
const app = express();
// Connect to MongoDB on Vercel (serverless)
let dbPromise = null;
if (process.env.VERCEL) {
  app.use(async (req, res, next) => {
    try {
      if (mongoose.connection.readyState !== 1) {
        if (!dbPromise) {
          dbPromise = mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 15000
          });
        }
        await dbPromise;
      }
      next();
    } catch (err) {
      dbPromise = null;
      next(err);
    }
  });
}
app.set('trust proxy', 1);

// Set security HTTP headers
app.use(helmet());

// Enable CORS
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:4200',
  credentials: true
}));

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Sanitize helpers (Express 5 compatible)
const stripMongoOperators = (obj) => {
  if (!obj || typeof obj !== 'object') return obj;
  for (const key of Object.keys(obj)) {
    if (key.startsWith('$') || key.includes('.')) {
      delete obj[key];
    } else if (typeof obj[key] === 'object') {
      stripMongoOperators(obj[key]);
    } else if (typeof obj[key] === 'string') {
      obj[key] = obj[key].replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
  }
  return obj;
};

// Data sanitization against NoSQL injection and XSS (body and params only)
app.use((req, res, next) => {
  if (req.body) stripMongoOperators(req.body);
  if (req.params) stripMongoOperators(req.params);
  next();
});

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Basic route
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Physio Care API is healthy and running.'
  });
});

// Routes
app.use('/api/v1/auth', authRouter);
// app.use('/api/v1/users', userRouter);
// app.use('/api/v1/appointments', appointmentRouter);

// Handle unhandled routes (Express 5 compatible)
app.use((req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

export default app;