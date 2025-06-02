const express = require('express');
const cartController = require('../controllers/cart.controller');
const authController = require('../controllers/auth.controller');
const router = express.Router();

//상품생성                
router.post("/"
    , authController.authenticate
    , cartController.addToCart);

module.exports = router;