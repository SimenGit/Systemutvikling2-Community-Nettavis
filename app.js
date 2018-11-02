const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//middleware
const morgan = require('morgan');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

//bruker morgan før den handler requests
app.use(morgan('dev'));

//false for å bare handle url-encoded data
app.use(bodyParser.urlencoded({extended: false}));
//extract json data og gjør det lettere leselig
app.use(bodyParser.json());

//routes that handle requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

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