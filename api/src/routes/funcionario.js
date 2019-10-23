const express = require('express');
const router = express.Router();
const funcionarioController = require('../controllers/funcionarioController');

router.get('/',funcionarioController.get);
router.get('/:nome',funcionarioController.getOne);
router.get('/byid/:id',funcionarioController.getById);

module.exports = router;
