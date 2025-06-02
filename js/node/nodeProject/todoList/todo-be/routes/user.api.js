const express = require('express');
const userController = require('../controller/user.controller');
const authController = require('../controller/auth.controller');
const router = express.Router();

//회원가입
router.post('/', userController.createUser);

//로그인
router.post('/login', userController.loginWithEmail);

//유저리스트
router.get('/', userController.getUserList);

//토큰을 통해 유저 id를 가져와 아이디를 통해 유저 객체를 조회한다.
router.get('/me', authController.authenticate
    , userController.getUser //next를 수행할 위치를 정한다.
);

router.put('/:id', userController.putUser);

router.delete('/:id', userController.deleteUser);

module.exports = router;