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

app.use('/api/customer', customer);

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