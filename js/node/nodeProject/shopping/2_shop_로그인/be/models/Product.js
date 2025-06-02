const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = Schema({
    sku : {type : String, required : true, unique : true}//제품 구별 코드
    , name : {type : String, required : true}
    , image : {type : String, required : true}
    , category : {type : Array, required : true}
    , description : {type : String, required : true}
    , price : {type : Number, required : true}
    , stock : {type : Object, required : true}//제고 정보
    , status : {type : String, default : 'active'}//상태
    , isDeleted : {type : Boolean, default : false}//삭제 플레그
}, {timstamps : true});

productSchema.methods.toJSON = function(){
    const obj = this._doc;
    delete obj.__v;
    delete obj.updateAt;
    delete obj.createAt;

    return obj;
}

const Product = mongoose.model("Product", productSchema);
module.exports = Product;