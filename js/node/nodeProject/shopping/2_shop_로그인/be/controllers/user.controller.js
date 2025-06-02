const User = require("../models/User");
const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);

const userController = {};

userController.createUser = async (req, res) => {
    try {
        const {email, password, name, level} = req.body;

        //---> 해당 이메일로 회원가입한 사람이 있는지 확인한다. 
        //const user = await User.findOne({email : email});
        const user = await User.findOne({email});

        if(user){
            throw new Error("이미 가입된 이메일입니다.")
        }

        //---> 비밀번호 암호화
        const pwd = await bcrypt.hashSync(password, salt); 
                                                        //level - 값이 있을 경우 해당 값으로 저장, 없을 경우 customer로 저장
        const newUser = new User({email, password : pwd, name, lever : level ? level : 'customer'});

        //저장
        const response = await newUser.save();

        return res.status(200).json({status : "create success"});

    } catch (error) {
        res.status(400).json({status : "create fail", message : error.message});
    }
}


module.exports = userController;