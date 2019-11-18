const express = require('express');
const router = express.Router();
const recebimentoExternoController = require('../controllers/recebimentoexternoController');

router.get('/',recebimentoExternoController.get);
router.post('/',recebimentoExternoController.post);

module.exports = router;
