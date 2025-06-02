const mongoose = require('mongoose');
const Cart = require('./Cart');
const Product = require('./Product');
const Schema = mongoose.Schema;

const cartItemItemSchema = Schema({
    /*
    cartId : {type : mongoose.ObjectId, ref:Cart}
    , productId : {type : mongoose.ObjectId, ref:Product}
    , size : {type : String, required : true}
    , qty : {type : Number, default : 1, required : true}//수량
    */
}, {timstamps : true});

//조회시 해당 정보는 빼고 조회한다.
cartItemItemSchema.methods.toJSON = function(){
    const obj = this._doc;
    delete obj.password;
    delete obj.__v;
    delete obj.updateAt;
    
    return obj;
}

const CartItem = mongoose.model("CartItem", cartItemItemSchema);
module.exports = CartItem;