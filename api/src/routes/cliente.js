const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.get('/',clienteController.get);
router.get('/byid/:id',clienteController.getOnClienteById);
router.get('/:nome',clienteController.getOneClienteByName);


module.exports = router;