const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = mongoose.Schema({
    task:{
        type : String
        , required : true
    }
    , isComplete:{
        type : Boolean
        , required : true
    }
},{timestamps : true});
//timestamps - 데이터 생성 시간 등이 추가된다.

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;