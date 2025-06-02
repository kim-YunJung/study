const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/mongoose-test');
//db연결

const { Schema } = mongoose;
//db스키마

const validator = require('validator');

const userSchema = new Schema({
    name : {type : String, required : true}//required : true 필수값 설정
    , email : {type : String, required : true, validate : {
        validator:function(val){
            if(!validator.isEmail(val))
                throw new Error('이메일을 확인해주세요');
        }
    }}//validate 정규화 체크
    , password : {type : String, required : true, trim: true}//trim 공백제거
    , age : {type : Number, default : 0}//default 기본값
});

const User = mongoose.model("User", userSchema);
//모델 생성

const newUser = new User({
    name : 'yuni3'
    , email : 'yuni3@test.com'
    , password : '1234'
    , age : 17
});

/*
newUser.save().then(
    val => console.log('value is ', val)
);
*/
//데이터 저장

/*
User.find().then(
    val => console.log('value is ', val)
);
*/
//전체 데이터 출력

/*
User.find({name : 'yuni3'}).then(
    val => console.log('value is ', val)
);
*/
//부분 검색

/*
User.find({name : 'yuni3'})
.select("name")
.then(
    val => console.log('value is ', val)
);
*/
//id, name 출력

User.find({name : 'yuni3'})
.select("name -_id")
.then(
    val => console.log('value is ', val)
);
//id를 제외하고, name만 출력