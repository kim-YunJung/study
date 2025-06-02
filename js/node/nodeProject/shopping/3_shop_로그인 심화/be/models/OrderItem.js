const mongoose = require('mongoose');
const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');
const Schema = mongoose.Schema;

const OrderItemItemSchema = Schema({
     orderId : {type : mongoose.ObjectId, ref:Order}            
    , productId : {type : mongoose.ObjectId, ref:Product}        
    , qty : {type : Number, default : 1, required : true}
    , size : {type : String, required : true}
    , price : {type : Number, required : true}
}, {timstamps : true});

//조회시 해당 정보는 빼고 조회한다.
OrderItemItemSchema.methods.toJSON = function(){
    const obj = this._doc;
    delete obj.password;
    delete obj.__v;
    delete obj.updateAt;
    
    return obj;
}

const OrderItem = mongoose.model("OrderItem", OrderItemItemSchema);
module.exports = OrderItem;