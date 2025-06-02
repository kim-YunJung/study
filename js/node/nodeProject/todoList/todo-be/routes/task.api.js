const express = require('express');
const taskController = require('../controller/task.controller');
const authController = require('../controller/auth.controller');
const router = express.Router();

//토큰에서 아이디를 가지고와 유저정보를 찾아 저장할 때, 넣어준다.
router.post('/', authController.authenticate, taskController.createTask);

router.get('/', taskController.getTask);

router.put('/:id', taskController.putTask);

router.delete('/:id', taskController.deleteTask);

module.exports = router;