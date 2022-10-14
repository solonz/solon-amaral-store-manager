const express = require('express');
const productsController = require('../controllers/products.controller');

// const validateNewPassengerFields = require('../middlewares/validateNewPassengerFields');
// const validateRequestTravelSchema = require('../middlewares/validatePassengerFields');

const router = express.Router();

// router.post(
//   '/:passengerId/request/travel',
//   validateRequestTravelSchema,
//   passengerController.createTravel,
// );

router.get('/', productsController.listAllProducts);

router.get('/:id', productsController.getProduct);

// router.post(
//   '/',
//   validateNewPassengerFields,
//   passengerController.createPassenger,
// );

module.exports = router;