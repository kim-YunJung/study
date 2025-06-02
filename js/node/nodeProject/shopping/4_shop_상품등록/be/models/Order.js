const mongoose = require('mongoose');
const User = require('./User');
const OrderItem = require('./OrderItem');
const Schema = mongoose.Schema;

/*
ObjectId 
관계형 데이터베이스의 외래 키(Foreign Key)와 유사한 기능

isObjectIdOrHexString
이 함수는 isValidObjectId() 와 유사하
isValidObjectId() 는 Mongoose 가 ObjectId로 변환할 수 있는 모든 값에 대해 true 를 반환하
isObjectIdOrHexString() 는 ObjectId 인스턴스 또는 24자 16진수 문자열에 대해서만 true 를 반환

https://runebook.dev/ko/docs/mongoose/api/mongoose?page=2
*/
const orderSchema = Schema({
    userId : {type : mongoose.ObjectId, ref:User}
    , status : {type : String, default : 'preparing'}
    , totalPrice : {type : Number, required : true, default : 0}
    , shipTo : {type : Object, required : true}
    , contact : {type : Object, required : true}
    , orderNum : {type : String}
}, {timstamps : true});

//조회시 해당 정보는 빼고 조회한다.
orderSchema.methods.toJSON = function(){
    const obj = this._doc;
    delete obj.password;
    delete obj.__v;
    delete obj.updateAt;
    
    return obj;
}

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;