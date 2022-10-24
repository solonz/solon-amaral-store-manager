const express = require('express');
const productsController = require('../controllers/products.controller');
const nameValidation = require('../services/validations/nameValidation');

// const validateNewPassengerFields = require('../middlewares/validateNewPassengerFields');
// const validateRequestTravelSchema = require('../middlewares/validatePassengerFields');

const router = express.Router();
router.use(express.json());

// router.post(
//   '/:passengerId/request/travel',
//   validateRequestTravelSchema,
//   passengerController.createTravel,
// );

router.get('/', productsController.findAll);
router.get('/:id', productsController.findById);
router.post('/', nameValidation, productsController.createProduct);
router.put('/:id', nameValidation, productsController.updateProduct);

// router.post(
//   '/',
//   validateNewPassengerFields,
//   passengerController.createPassenger,
// );

module.exports = router;