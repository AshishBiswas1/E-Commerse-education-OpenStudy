const express = require('express');
const path = require('path');
const courseRouter = require('./Routes/courseRouter');
const userRouter = require('./Routes/userRoutes');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./util/appError');

// Patch express.application.use to log all route registrations
// const originalUse = express.application.use;
// express.application.use = function (path, ...handlers) {
//   try {
//     if (typeof path === 'string') {
//       console.log('Registering route:', path);
//     } else if (typeof path === 'function') {
//       console.log('Registering route with middleware function');
//     } else {
//       console.log('Registering route with path:', JSON.stringify(path));
//     }
//   } catch (err) {
//     console.error('Error while logging route registration:', err);
//   }

//   return originalUse.call(this, path, ...handlers);
// };

// Start express app
const app = express();

app.use(express.json());

// GLOBAL MIDDLEWARES
// Serving static file
app.use(express.static(path.join(__dirname, 'public')));

// 3) ROUTES

app.use('/api/courses', courseRouter);

app.use('/api/users', userRouter);

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`
  });
});

app.use(globalErrorHandler);

module.exports = app;
