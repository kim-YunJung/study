const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');

require('dotenv').config({path:'../env'});

const userSchema = mongoose.Schema({
    name:{
        type : String
        , required : true
    }
    , email:{
        type : String
        , required : true
    }
    , password:{
        type : String
        , required : true
    }
},{timestamps : true});

//조회시 해당 정보는 빼고 조회한다.
userSchema.methods.toJSON = function(){
    const obj = this._doc;
    delete obj.password;
    delete obj.__v;

    return obj;
}

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

userSchema.methods.generateToken = function () {
    //토큰 발행 - 유저정보 / 비밀키
                                                            //토큰의 유통기한 정하기
    const token = jwt.sign({ _id: this._id}, JWT_SECRET_KEY, {expiresIn:'1d'});
    return token;
}

const User = mongoose.model("User", userSchema);
module.exports = User;