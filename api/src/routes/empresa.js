const express = require('express');
const router = express.Router();
const empresaController = require('../controllers/empresaController');

router.get('/',empresaController.get);
router.get('/byid/:id',empresaController.getOneEmpresaById);
router.get('/:nome_param',empresaController.getOneEmpresaByName);

module.exports = router;
