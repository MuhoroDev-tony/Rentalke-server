const express = require('express');
const { validate } = require('../middlewares/validate.middleware');
const { estateSchema, buildingSchema, rentalUnitSchema } = require('../validators/property.validator');
const estateController = require('../controllers/estate.controller');
const buildingController = require('../controllers/building.controller');
const unitController = require('../controllers/unit.controller');
const { authenticate } = require('../middlewares/auth.middleware');

const router = express.Router();

// Estate routes
router.post('/manager/estate', authenticate, validate(estateSchema), estateController.createEstate);
router.get('/manager/estates', authenticate, estateController.getManagerEstates);
router.get('/manager/estate/:id', authenticate, estateController.getManagerEstateById);
router.get('/estates/all', estateController.getAllEstates);
router.get('/estates/:id', estateController.getEstateById);
router.put('/manager/estate/:id', authenticate, validate(estateSchema), estateController.updateEstate);
router.delete('/manager/estate/:id', authenticate, estateController.deleteEstate);

// Building routes
router.post('/manager/building', authenticate, validate(buildingSchema), buildingController.createBuilding);
router.get('/manager/buildings', authenticate, buildingController.getManagerBuildings);
router.get('/manager/building/:id', authenticate, buildingController.getManagerBuildingById);
router.get('/buildings/all', buildingController.getAllBuildings);
router.get('/buildings/:id', buildingController.getBuildingById);
router.put('/manager/building/:id', authenticate, validate(buildingSchema), buildingController.updateBuilding);
router.delete('/manager/building/:id', authenticate, buildingController.deleteBuilding);

// Rental Unit routes
router.post('/manager/rental-unit', authenticate, validate(rentalUnitSchema), unitController.createRentalUnit);
router.get('/manager/rental-units', authenticate, unitController.getManagerRentalUnits);
router.get('/manager/rental-unit/:id', authenticate, unitController.getManagerRentalUnitById);
router.get('/rental-units/all', unitController.getAllRentalUnits);
router.get('/rental-units/:id', unitController.getRentalUnitById);
router.put('/manager/rental-unit/:id', authenticate, validate(rentalUnitSchema), unitController.updateRentalUnit);
router.delete('/manager/rental-unit/:id', authenticate, unitController.deleteRentalUnit);

module.exports = router;
