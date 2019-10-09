const express = require('express');
const router = express.Router();
const funcionarioController = require('../controllers/funcionarioController');

router.get('/',funcionarioController.get);
router.get('/:id',funcionarioController.getOne)


module.exports = router;