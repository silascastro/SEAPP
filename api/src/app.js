const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');

const indexRoute = require('./routes/index');
const functionarioRoute = require('./routes/funcionario');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(logger());
app.use('/', indexRoute);
app.use('/funcionarios', functionarioRoute);


module.exports = app;
