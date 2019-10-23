const express = require('express');
const router = express.Router();
const recebimentoExternoController = require('../controllers/recebimentoexternoController');

router.get('/',recebimentoExternoController.get);
router.post('/',recebimentoExternoController.post);
//router.get('/byid/:id',clienteController.getOnClienteById);
//router.get('/notcont/:nome', clienteController.getOneClienteByNameHasNotCont);
//router.get('/byname/:nome',clienteController.getOneClienteByName);
//router.get('/:nome',clienteController.getOneClienteByName);

module.exports = router;
