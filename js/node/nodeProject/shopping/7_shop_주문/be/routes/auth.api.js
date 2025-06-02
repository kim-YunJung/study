const express = require('express');
const authController = require('../controllers/auth.controller');
const router = express.Router();

//회원가입
router.post("/login", authController.loginWithEmail);

module.exports = router;