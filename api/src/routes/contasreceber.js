const express = require('express');
const router = express.Router();
const contasreceberController = require('../controllers/contasreceberController');

router.get('/',contasreceberController.get);
//router.get('/:id',funcionarioController.getOne);


module.exports = router;