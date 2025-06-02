const User = require("../models/User");
const bcrypt = require('bcryptjs');

const authController = {};

authController.loginWithEmail = async (req, res) => {
    try {
        const {email, password} = req.body;

        let user = await User.findOne({email});

        if(!user){
            throw new Error("이메일 / 비밀번호를 확인해주세요.")    
        }
        
        //비밀번호 비교
        const isMath = await bcrypt.compare(password, user.password);
            
        if(isMath){
            //토큰 생성
            const token = await user.generateToken();

            return res.status(200).json({status : "login success", user, token});
        }
    
    } catch (error) {
        res.status(400).json({status : "login fail", message : error.message});
    }
}


module.exports = authController;