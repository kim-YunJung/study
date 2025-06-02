const express = require("express")
const mongoose = require("mongoose");

require('dotenv').config();

const cors = require('cors');

const app = express()
app.use(cors())

//mongoose.connect("데이터 베이스 주소") -- 주소, 옵션을 넣을 수 있으나 버전에 따라 오류가 발생할 수 있다.
mongoose.connect(process.env.DB).then(()=> console.log("connected to database"));

module.exports = app;
