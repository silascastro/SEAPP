const express = require('express');
const router = express.Router();
const pedidoExternoItem = require('../controllers/pedidoExternoItemController');

router.get('/',pedidoExternoItem.get);
router.post('/',pedidoExternoItem.post);

module.exports = router;
