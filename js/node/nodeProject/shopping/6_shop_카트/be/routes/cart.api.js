const express = require('express');
const cartController = require('../controllers/cart.controller');
const authController = require('../controllers/auth.controller');
const router = express.Router();

//상품생성                
router.post("/"
    , authController.authenticate
    , cartController.addToCart);

router.get("/"
    , authController.authenticate
    , cartController.getCart);

router.delete("/:id"
    , authController.authenticate
    , cartController.deleteCartItem);

router.put("/:id"
    , authController.authenticate
    , cartController.updateQty);
        

module.exports = router;