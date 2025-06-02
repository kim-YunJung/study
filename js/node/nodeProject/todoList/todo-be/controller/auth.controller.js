//권한 권리용 
const User = require("../model/User");
const jwt = require('jsonwebtoken');

require('dotenv').config({path:'../env'});

const  JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const authController = {};

authController.authenticate = (req, res, next) => {
    try {
        //fe 보낸 토큰 값을 읽어온다. 
        const tokenString = req.headers.authorization;//"Bearer "+response.data.token;

        if(!tokenString){
            throw new Error("invalid token");
        }

        const token = tokenString.replace("Bearer ", "");
        
        //토큰의 유효기간 등을 체크한다.
        jwt.verify(token, JWT_SECRET_KEY, (error, payload)=>{
            if(error){
                throw new Error("invalid token");
            }

            //next 호출 전, 보내야할 정보를 정한다.
            req.userId = payload._id;

            //해당 함수의 기능 범위를 넘어서서, next를 이용해 다음 내용을 정의한다.
            //토큰 id를 통해 유저정보를 가져온다.
            next();    
        });

    } catch (error) {
        res.status(400).json({status:"fail", message : error.message});
    }
}

module.exports = authController;

/*
미들웨어 next
*/