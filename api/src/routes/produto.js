const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

router.get('/',produtoController.get);
router.get('/:id',produtoController.getOneProductById);
router.get('/byname/:nome_param',produtoController.getOneProductByName);

module.exports = router;