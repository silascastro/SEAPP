const express = require('express');
const router = express.Router();
const pedidoexternoController = require('../controllers/pedidoexternoController');

router.get('/',pedidoexternoController.get);
router.post('/',pedidoexternoController.post);

module.exports = router;
