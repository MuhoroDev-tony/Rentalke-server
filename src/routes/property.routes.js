const express = require('express');
const { validate } = require('../middlewares/validate.middleware');
const { estateSchema, buildingSchema, rentalUnitSchema } = require('../validators/property.validator');
const propertyController = require('../controllers/property.controller');
const { authenticate } = require('../middlewares/auth.middleware');

const router = express.Router();

// Estate routes
router.post('/manager/estate', authenticate, validate(estateSchema), propertyController.createEstate);
router.get('/manager/estates/', authenticate, propertyController.getManagerEstates);
router.get('/estates/all', propertyController.getAllEstates);
router.put('/manager/estate/:id', authenticate, validate(estateSchema), propertyController.updateEstate);
router.delete('/manager/estate/:id', authenticate, propertyController.deleteEstate);

// Building routes
router.post('/manager/building', authenticate, validate(buildingSchema), propertyController.createBuilding);
router.get('/manager/buildings', authenticate, propertyController.getManagerBuildings);
router.put('/manager/buildings/:id', authenticate, validate(buildingSchema), propertyController.updateBuilding);
router.delete('/manager/buildings/:id', authenticate, propertyController.deleteBuilding);

// Rental Unit routes
router.post('/manager/rental-unit', authenticate, validate(rentalUnitSchema), propertyController.createRentalUnit);
router.get('/manager/rental-units', authenticate, propertyController.getManagerRentalUnits);
router.put('/manager/rental-unit/:id', authenticate, validate(rentalUnitSchema), propertyController.updateRentalUnit);
router.delete('/manager/rental-unit/:id', authenticate, propertyController.deleteRentalUnit);

module.exports = router;
