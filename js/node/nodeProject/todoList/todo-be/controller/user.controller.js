const { emit } = require("nodemon");
const User = require("../model/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const salt = bcrypt.genSaltSync(10);//암호화를 10번 진행한다.

const userController = {};

userController.createUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        //이미 가입한 유저인지 확인
        //const user = await User.findOne({email:email});
        const user = await User.findOne({email});

        if(user){
            throw new Error('이미 가입이 된 유저입니다.');
        }

        const hash = bcrypt.hashSync(password, salt);

        const newUser = new User({name, email, password:hash});

        await newUser.save();

        res.status(200).json({status : 'ok', data : newUser});
    } catch (error) {
        res.status(400).json({status : 'fail', message : error.message});
    }
};

//로그인
userController.loginWithEmail = async (req, res) => {
    try {
        //email, password 읽어오기
        const {email, password} = req.body;

        //이메일 가지고 유저정보 가져오기
        const user = await User.findOne({email}, "-createdAt -updatedAt -__v");

        if(user){
            //유저의 db pw와 프론트에서 보낸 패스워드가 같은지 비교
            const isMath = bcrypt.compareSync(password, user.password);
                        
            if(isMath){
                //토큰 발행 
                const token = user.generateToken();
                //응답으로 유정보 + 토큰 보냄
                return res.status(200).json({status : 'ok', user, token});
            }else{
                throw new Error('아이디 또는 비밀번호를 확인해주세요.');
            }
            
        }
    } catch (error) {
        res.status(400).json({status : 'fail', message : error.message});
    }
};

userController.getUser = async (req, res) => {
  try {
    const {userId} = req;//req.userId

    const user = await User.findById(userId);
    
    if(!user){
        throw new Error('유저정보가 없습니다.');
    }

    //res.status(200).json({status:"ok", user : user});
    res.status(200).json({status:"ok", user});
  } catch (error) {
    res.status(400).json({status:"fail", message : error.message});
  }  
};

userController.getUserList = async (req, res) => {
    try {
        const userList = await User.find({});

        res.status(200).json({status : 'ok', data : userList});
    } catch (error) {
        res.status(400).json({status : 'fail', message : error.message});
    }
};

userController.putUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const hash = bcrypt.hashSync(req.body.password, salt);

        // https://hackmd.io/@oW_dDxdsRoSpl0M64Tfg2g/HkkCE-tSn
        const userUpdate = await User.updateOne(
            { _id: userId }, 
            [{ $set: { name: req.body.name, password: hash } }]
        );

        res.status(200).json({status : 'ok', data : userUpdate});
    } catch (error) {
        res.status(400).json({status : 'fail', message : error.message});
    }
};

userController.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        console.log(userId);

        const userDelete = await User.deleteOne({ _id : userId });

        res.status(200).json({status : 'ok', data : userDelete});
    } catch (error) {
        res.status(400).json({status : 'fail', message : error.message});
    }
};

module.exports = userController;