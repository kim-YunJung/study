"use strict";

//모듈
const express = require('express');
const bodyParser = require('body-parser');

//환경 변수를 등록 및 관리
const dotenv = require('dotenv');
dotenv.config();

const logger = require('./src/config/logger');
//해당 상황에 따라 원하는 내용을 출력
logger.log('info', '출력을 원하는 내용');
//logger.info('출력을 원하는 내용');

const app = express();

//라우팅
const home = require('./src/routes/home');

//app셋팅
app.set('views', './src/views');
app.set('view engine', 'ejs');

//정적 경로 추가
app.use(express.static(`${__dirname}/src/public`));

app.use(bodyParser.json());
//URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 인식되지 않는 문제 해결
app.use(bodyParser.urlencoded({extended : true}));

/* use 미들웨어를 등록해주는 메서드이다. 
routes / home / index.js에 정의한 api를 호출한다.*/
app.use('/', home);

module.exports = app;

/*
기존에 node 실행 코드
nodemon app.js였으나 실행 부분을 분래해줘서 아래의 코드로 실행이 된다.
nodemon ./bin/www.js

package.json에 start에 추가했을 경우 npm start로 작성하면 서버가 실행된다.
 "scripts": {
    "start": "node ./bin/www.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },

  "scripts": {
    "start": "nodemon ./bin/www.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
*/