const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

const User = mongoose.model("User", userSchema);
module.exports = User;