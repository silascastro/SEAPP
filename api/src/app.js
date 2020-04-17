const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');
const multer = require('multer');

const indexRoute = require('./routes/index');
const funcionarioRoute = require('./routes/funcionario');
const clienteRoute = require('./routes/cliente');
const contasreceberRoute = require('./routes/contasreceber');
const recebimentoexterno = require('./routes/recebimentoexterno');
const produto = require('./routes/produto');
const empresa = require('./routes/empresa');
const pedidoexterno = require('./routes/pedidoexterno');
const pedidoexternoitens = require('./routes/pedidoexternoItens');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(logger());
app.use('/', indexRoute);
app.use('/funcionarios', funcionarioRoute);
app.use('/clientes', clienteRoute);
app.use('/contasreceber',contasreceberRoute);
app.use('/recebimentoexterno',recebimentoexterno);
app.use('/produtos',produto);
app.use('/empresas',empresa);
app.use('/pedidoexterno',pedidoexterno);
app.use('/pedidoitens',pedidoexternoitens);
app.use('/imagens',express.static('C:\\Estoque\\Fotos\\Produtos\\'));

module.exports = app;
