const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();

const startDB = require('./config/db');
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const prodRouter = require('./routes/product');
const cartRouter = require('./routes/cart');

const app = express();
startDB()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api/products', prodRouter);
app.use('/api/cart', cartRouter);
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  if (req.path.startsWith('/api/')) {
    return res.status(err.status || 500).json({
      message: err.message || "Internal server error",
      error: req.app.get('env') === 'development' ? err.stack : {}
    });
  }

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
