const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

router.get('/',produtoController.get);
router.get('/byid/:id',produtoController.getOneProductById);
router.get('/:nome_param',produtoController.getOneProductByName);

module.exports = router;
