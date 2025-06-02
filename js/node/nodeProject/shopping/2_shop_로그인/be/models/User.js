const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSchema = Schema({
    email : {type : String, required : true, unique : true}
    , password : {type : String, required : true}
    , name : {type : String, required : true}
    , level : {type : String, default : "customer"}//권한 customer / admin
}, {timstamps : true});

//조회시 해당 정보는 빼고 조회한다.
userSchema.methods.toJSON = function(){
    const obj = this._doc;
    delete obj.password;
    delete obj.__v;

    return obj;
}

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

//토큰 생성 함수
userSchema.methods.generateToken = async function(){
    const token = await jwt.sign({_id : this.id}, JWT_SECRET_KEY, {expiresIn : "1d"});
    return token;
}

const User = mongoose.model("User", userSchema);
module.exports = User;