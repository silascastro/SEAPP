const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');

const indexRoute = require('./routes/index');
const funcionarioRoute = require('./routes/funcionario');
const clienteRoute = require('./routes/cliente');
const contasreceberRoute = require('./routes/contasreceber');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(logger());
app.use('/', indexRoute);
app.use('/funcionarios', funcionarioRoute);
app.use('/clientes', clienteRoute);
app.use('/contasreceber',contasreceberRoute);


module.exports = app;
