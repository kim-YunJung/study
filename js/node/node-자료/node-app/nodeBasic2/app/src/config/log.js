"use strict";

var fs = require('fs')
//루트 경로를 찾는 모듈
const appRoot = require('app-root-path');

var accessLogStream = fs.createWriteStream(
    //path.join(__dirname, 'access.log'), { flags: 'a' }
    `${appRoot}/log/access.log`, { flags: 'a' }
)

module.exports = accessLogStream;