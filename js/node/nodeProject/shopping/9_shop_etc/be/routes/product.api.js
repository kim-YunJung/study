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

router.put("/:id"
    , authController.authenticate
    , authController.checkAdminPermission//admin인지 확인 필요
    , productController.updaterProduct);

router.get("/:id", productController.getProduct);

router.put("/:id"
    , authController.authenticate
    , authController.checkAdminPermission//admin인지 확인 필요
    , productController.updaterProduct);

router.put("/delete/:id"
    , authController.authenticate
    , authController.checkAdminPermission//admin인지 확인 필요
    , productController.deleteProduct);

module.exports = router;