
// Importing express module
const express = require("express")
const router = express.Router()

const { register, login, forgetPassword, verifyOtp, checkUserName } = require('../controllers/auth.controller');
const { validateUserOnRegistration, validateUserOnLogin } = require('../validators/user')
const { verifyRegister, checkEmailExists } = require('../middleware/auth')

// validateUserOnRegistration
router.post("/register", verifyRegister, register)
router.post("/login", validateUserOnLogin, login)

router.post("/forget-password", checkEmailExists , forgetPassword);
router.post("/check-user-name", checkUserName);

router.post("/verify-otp", verifyOtp);

module.exports = router