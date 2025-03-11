//admin users routes
const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controllers/admin.users.controller');
const { authenticate } = require('../middlewares/auth.middleware');

router.get('/users', authenticate, getAllUsers);

module.exports = router;