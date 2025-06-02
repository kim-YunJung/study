"use strict";

const User = require('../../models/User');
const logger = require('../../config/logger');

/* 컨트롤러의 내용을 분리해준다. */
const output = {
    home : (req, res) => {
        res.render('home/index');
    }
    , login : (req, res) => {
        res.render('home/login');
    }
    , register : (req, res) => {
        res.render('home/register');
    }
    //페이지를 렌더링하는 api
}

const process = {
    login : async (req, res) => {    
        const user = new User(req.body);        
        const response = await user.login();

        const url = {
            method : "POST"
            , path : "./login"
            , status : response.err ? 400 : 200
        }

        log(response, url);
        return res.json(response);
    }
    ,register : async (req, res) => {    
        const user = new User(req.body);        
        const response = await user.register();

        const url = {
            method : "POST"
            , path : "./register"
            , status : response.err ? 409 : 201
        }

        log(response, url);
        return res.json(response);
    }
}

const log= (response, url) => {
    if(response.err){
        logger.error(`${url.method} ${url.path} / 
        ${url.status} Response : ${response.success}, ${response.err}`);
    }else{
        logger.info(`${url.method} ${url.path} / 
        ${url.status} Response : ${response.success}, msg : ${response.msg || ""}`);
    }
}

module.exports = {
    output
    , process
}