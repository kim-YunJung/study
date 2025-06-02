const User = require("../models/User");
const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const bcrypt = require('bcryptjs');

require('dotenv').config();

const authController = {};

const salt = bcrypt.genSaltSync(10);

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

authController.loginWithEmail = async (req, res) => {
    try {
        const {email, password} = req.body;

        let user = await User.findOne({email});

        if(!user){
            throw new Error("이메일 / 비밀번호를 확인해주세요.");   
        }
        
        //비밀번호 비교
        const isMath = await bcrypt.compare(password, user.password);

        if(isMath){
            //토큰 생성
            const token = await user.generateToken();

            return res.status(200).json({status : "login success", user, token});
        }else{
            throw new Error("이메일 / 비밀번호를 확인해주세요.");
        }
    
    } catch (error) {
        res.status(400).json({status : "login fail", message : error.message});
    }
  
}

authController.authenticate = async (req, res, next) => {
    try {
        const tokenString = req.headers.authorization;

        if(!tokenString){
            throw new Error("토큰이 없습니다.");
        }

        const token = tokenString.replace("Bearer ", "");

        //토크값 복호화
        jwt.verify(token, JWT_SECRET_KEY, (error, payload) => {
            if(error)
                throw new Error("유효하지 않은 토큰입니다.");

            req.userId = payload._id;
        });
        
        //다음으로 넘어간다.
        next();

    } catch (error) {
        res.status(400).json({status : "auth fail", message : error.message});
    }
}

authController.checkAdminPermission = async (req, res, next) => {
    try {
        //토큰값을 통해 admin인지 확인을 위해 토큰을 가져온다.
        const {userId} = req;

        const user = await User.findById(userId);

         if(user.level !== 'admin'){
            throw new Error('권한이 없습니다.');
         }

         next();
    } catch (error) {
        res.status(400).json({status : "check admin fail", message : error.message});
    }
}

authController.loginWithGoogle = async (req, res) => {
    try {
        const {token} = req.body;
        const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);
  
        const ticket = await googleClient.verifyIdToken({
            idToken: token//해석 하고 싶은 내용
            //, audience: GOOGLE_CLIENT_ID//해석을 위한 키
        });
 
        const {email, name} = ticket.getPayload();
       
        let user = await User.findOne({email});

        if(!user){
            //유저를 생성
            const randomPassword = ""+Math.floor(Math.random()*100000000);
            const pwd = await bcrypt.hashSync(randomPassword, salt); 

            user = new User({email, password : pwd, name});

            await user.save();
        }
        
        //토큰을 발행 
        const tokens = await user.generateToken();

        return res.status(200).json({status : "login success", data : user, token : tokens});
       
    
    } catch (error) {
        res.status(400).json({status : "login fail", message : error.message});
    }
  
}

module.exports = authController;