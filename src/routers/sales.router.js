const express = require('express');
const salesController = require('../controllers/sales.controller');
// const nameValidation = require('../services/validations/nameValidation');

const router = express.Router();
router.use(express.json());

router.get('/', salesController.findAll);
router.get('/:id', salesController.findById);

module.exports = router;