//admin users routes
const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/auth.middleware');
const { createUser } = require('../controllers/adminusers/admin.create.users.controller');
const { editUser } = require('../controllers/adminusers/admin.edit.user.controller');
const { deleteUser } = require('../controllers/adminusers/admin.delete.user.controller');
const { getAllUsers } = require('../controllers/admin.users.controller');

// Middleware to ensure only admins can access these routes
const adminOnly = (req, res, next) => {
    if (!req.user || req.user.role !== 'ADMIN') {
        return res.status(403).json({
            success: false,
            message: 'Access denied. Admin only.'
        });
    }
    next();
};

// Apply authentication to all routes
router.use(authenticate);
router.use(adminOnly);

// User management routes
router.post('/users', createUser);           // Create new user
router.get('/users', getAllUsers);           // Get all users
router.put('/users/:id', editUser);          // Edit user by ID
router.delete('/users/:id', deleteUser);     // Delete user by ID

module.exports = router;