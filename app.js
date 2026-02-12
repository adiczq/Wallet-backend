require('dotenv').config();
if (process.env.NODE_ENV !== 'production') {
  console.log('📨 Mailjet config:', {
    hasPublic: !!process.env.MJ_APIKEY_PUBLIC,
    hasPrivate: !!process.env.MJ_APIKEY_PRIVATE,
    sender: process.env.MAILJET_SENDER_EMAIL,
  });
}
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const authRouter = require('./routes/authRouter');
const transactionsRouter = require('./routes/transactionsRouter');
const userRouter = require('./routes/userRouter');
const errorHandler = require('./controllers/errorController');

const app = express();

// Middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(
  cors({
    origin: 'https://walletappbyadiczq.netlify.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/transactions', transactionsRouter);

// Handle not defined routes
app.all('*', (req, res, next) => {
  res.status(404).json({ message: 'Route not found!' });
});

// Error Handler
app.use(errorHandler);

module.exports = app;
