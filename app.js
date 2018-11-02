const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//middleware
const morgan = require('morgan');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const personRoutes = require('./api/routes/person');
const articleRoutes = require('./api/routes/article');


//bruker morgan før den handler requests
app.use(morgan('dev'));

//false for å bare handle url-encoded data
app.use(bodyParser.urlencoded({extended: false}));
//extract json data og gjør det lettere leselig
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//routes that handle requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/person', personRoutes);
app.use('/article', articleRoutes);

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