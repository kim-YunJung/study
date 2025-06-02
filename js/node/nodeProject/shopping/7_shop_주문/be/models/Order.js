const mongoose = require('mongoose');
const User = require('./User');
const Cart = require('./Cart');
const Product = require('./Product');
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
    , status : {type : String, default : 'preparing'}//상태
    , totalPrice : {type : Number, required : true, default : 0}
    , shipTo : {type : Object, required : true}//배송지
    , contact : {type : Object, required : true}//연락처
    , orderNum : {type : String}//주문번호
    , items : [
        {
            productId : {type : mongoose.ObjectId, ref:Product}        
            , qty : {type : Number, default : 1, required : true}
            , size : {type : String, required : true}
            , price : {type : Number, required : true}
        }
    ]
}, {timstamps : true});

//조회시 해당 정보는 빼고 조회한다.
orderSchema.methods.toJSON = function(){
    const obj = this._doc;
    delete obj.password;
    delete obj.__v;
    delete obj.updateAt;
    
    return obj;
}

//주문 후
orderSchema.post("save", async function () {
   //카트를 비움
    const cart = await Cart.findOne({userId : this.userId });

    cart.items = [];

    await cart.save();
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;