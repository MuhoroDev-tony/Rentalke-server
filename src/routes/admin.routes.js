const express = require('express');
const { validate } = require('../middlewares/validate.middleware');
const { registerSchema, loginSchema, changePasswordSchema, forgotPasswordSchema, verifyOtpSchema } = require('../validators/auth.validator');
const adminAuthController = require('../controllers/admin.auth.controller');
const { authenticate } = require('../middlewares/auth.middleware');

const router = express.Router();

// Admin auth routes
router.post('/signup', validate(registerSchema), adminAuthController.register);
router.post('/login', validate(loginSchema), adminAuthController.login);
router.post('/forgot-password', validate(forgotPasswordSchema), adminAuthController.forgotPassword);
router.post('/change-password', authenticate, validate(changePasswordSchema), adminAuthController.changePassword);
router.post('/verify-otp', validate(verifyOtpSchema), adminAuthController.verifyOTP);
router.post('/resend-otp', validate(forgotPasswordSchema), adminAuthController.resendOTP);

module.exports = router;
