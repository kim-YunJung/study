const express = require('express');
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');
const router = express.Router();

//회원가입
router.post("/", userController.createUser);

//토큰
router.get("/me", authController.authenticate//토큰이 사용가능한지 확인
    //유저 정보를 가져온다.
    , userController.getUser);

module.exports = router;