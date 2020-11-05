const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(session({
    secret: 'wf1d1wsS',
    resave: true,
    saveUninitialized: true
}));

const customer = require('./routes/customer');
const product = require('./routes/product');
const category = require('./routes/category');
const shop = require('./routes/shop');
const order = require('./routes/order');

app.use('/api/customer', customer);
app.use('/api/product', product);
app.use('/api/category', category);
app.use('/api/shop', shop);
app.use('/api/order', order);

mongoose
    .connect('mongodb://db:27017/sales', {
        useNewUrlParser: true,
        useFindAndModify: false
    })
    .then(result => {
        console.log('MongoDB Conectado');
    })
    .catch(error => {
        console.log(error);
    });

app.listen(3000, () => console.log('Server ativo na porta 3000'));