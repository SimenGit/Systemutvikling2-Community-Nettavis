// @flow

import path from 'path';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// linker til klienten
const public_path = path.join(__dirname, '/../../client/public');
app.use(express.static(public_path));

//middleware debugging logg
const morgan = require('morgan');

const articleRoutes = require('./api/routes/article');
const userRoutes = require('./api/routes/users');
const commentRoutes = require('./api/routes/comments');
const categoryRoutes = require('./api/routes/categories');
const ratingRoutes = require('./api/routes/rating');

//bruker morgan før den handler requests
app.use(morgan('dev'));

//false for å bare handle url-encoded data
app.use(bodyParser.urlencoded({ extended: false }));
//extract json data og gjør det lettere leselig
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

//routes that handle requests
app.use('/article', articleRoutes);
app.use('/users', userRoutes);
app.use('/comments', commentRoutes);
app.use('/categories', categoryRoutes);
app.use('/rating', ratingRoutes);

//custom 404 error handler
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

//returnerer error som json
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
