const mongoose = require('mongoose');
const User = require('./User');
const CartItem = require('./CartItem');
const Schema = mongoose.Schema;

const cartSchema = Schema({
    userId : {type : mongoose.ObjectId, ref:User}//외래키 참조
    , cartItemQty : {type : Number, required : true, default : 0}
}, {timstamps : true});

//조회시 해당 정보는 빼고 조회한다.
cartSchema.methods.toJSON = function(){
    const obj = this._doc;
    delete obj.password;
    delete obj.__v;
    delete obj.updateAt;
    
    return obj;
}

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;