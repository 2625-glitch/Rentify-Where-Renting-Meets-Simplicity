const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport');
const httpStatus = require('http-status');

const routes = require('./routes/v1');

const ApiError = require('./utils/ApiError');

const app = express();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());
app.get('/', (req, res) => {
  res.json('Hello');
});

// enable cors
app.use(
  cors({
    credentials: true,
    origin: '*',
  })
);
app.options('*', cors());

// jwt authentication
app.use(passport.initialize());

// v1 api routes
app.use('/v1', routes);
app.get('/', (req, res) => {
  res.json('Hello');
});

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

module.exports = app;
