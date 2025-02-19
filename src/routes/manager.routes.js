const express = require('express');
const { validate } = require('../middlewares/validate.middleware');
const { registerSchema, loginSchema, changePasswordSchema, forgotPasswordSchema, verifyOtpSchema } = require('../validators/auth.validator');
const managerAuthController = require('../controllers/manager.auth.controller');
const { authenticate } = require('../middlewares/auth.middleware');

const router = express.Router();

// Manager auth routes
router.post('/signup', validate(registerSchema), managerAuthController.register);
router.post('/login', validate(loginSchema), managerAuthController.login);
router.post('/forgot-password', validate(forgotPasswordSchema), managerAuthController.forgotPassword);
router.post('/change-password', authenticate, validate(changePasswordSchema), managerAuthController.changePassword);
router.post('/verify-otp', validate(verifyOtpSchema), managerAuthController.verifyOTP);
router.post('/resend-otp', validate(forgotPasswordSchema), managerAuthController.resendOTP);

module.exports = router;
