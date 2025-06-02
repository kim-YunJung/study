const express = require('express');
const router = express.Router();

const taskApi = require('./task.api');

//router가 tasks 주소로 불리면 taskApi를 사용한다.
router.use('/tasks', taskApi);

module.exports = router;