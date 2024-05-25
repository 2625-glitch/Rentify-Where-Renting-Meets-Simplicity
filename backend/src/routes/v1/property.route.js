// routes/v1/property.route.js
const express = require('express');
const propertyController = require('../../controllers/property.controller');

const router = express.Router();

router.route('/').get(propertyController.getAllProperties).post(propertyController.createProperty);
router.route('/user/:id').get(propertyController.getPropertiesByUserId);
router
  .route('/:id')
  .get(propertyController.getPropertyById)
  .put(propertyController.updateProperty)
  .delete(propertyController.deleteProperty);

module.exports = router;
