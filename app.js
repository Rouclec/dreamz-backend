//DEPENDECIES
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const compression = require('compression');

const app = express(); //APP DECLARATION

const authRouter = require('./routes/authRoutes');
const orderRouter = require('./routes/orderRoutes');

//IMPLEMENT CROSS ORGIN RESOURS SHARING (CORS)
app.use(cors());

app.options('*', cors()); //allow complex requests (request which contain options) for all routes to access our API

//MIDDLEWARES
app.use(helmet()); //security http header
app.use(mongoSanitize()); //sanitize all mongoDB query strings in request
app.use(xss()); //clean user input from malatious html code
app.use(hpp()); //prevents parameter pollution
app.use(express.json({ limit: '10kb' })); //Body parser, reading json data from body (limited to 10kb)
app.use(express.static(`${__dirname}/public`)); //serving static files
app.use(compression()); //compress all the text responses sent to client

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 100, //maximum of 100 requests from same IP,
  windowMs: 60 * 60 * 1000, //in 1 hour (60*60*1000)ms,
  message: 'Too many requests from this IP, please try again in an hour!',
});

app.use('/api', limiter); //limiting all requests to /api

app.use('/api/v1/users', authRouter);
app.use('/api/v1/orders', orderRouter);

module.exports = app;
