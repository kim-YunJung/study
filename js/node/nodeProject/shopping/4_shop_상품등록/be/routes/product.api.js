const express = require('express');
const productController = require('../controllers/product.controller');
const authController = require('../controllers/auth.controller');
const router = express.Router();

//상품생성                
router.post("/"
    , authController.authenticate
    , authController.checkAdminPermission//admin인지 확인 필요
    , productController.createProduct);

router.get("/", productController.getListProduct);

module.exports = router;