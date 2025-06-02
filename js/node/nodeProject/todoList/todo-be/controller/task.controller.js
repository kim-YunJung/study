const Task = require("../model/Task");
const User = require("../model/User");

const taskController = {};

taskController.createTask = async (req, res) => {
    try {
        const {userId} = req;//req.userId

        //req에 담겨져있는 데이터를 변수에 담는다.
        const {task, isComplete} = req.body;

        const newTask = new Task({task, isComplete, author: userId});

        //데이터를 저장한다.
        await newTask.save();

        //저장 상태를 알려준다.
        res.status(200).json({status : 'ok', data : newTask});
    } catch (error) {
        res.status(400).json({status : 'fail', error : err});
    }
};

taskController.getTask = async (req, res) => {
    try {
        //데이터를 불러온다.
        const taskList = await Task.find({})
            .populate("author");
            /* populate - ObjectId를 실제 객체로 치환하는 작업을 대신해준다. 
                join과 유사한 개념이다. 
            */

        //상태를 알려준다.
        res.status(200).json({status : 'ok', data : taskList});
    } catch (error) {
        res.status(400).json({status : 'fail', error : err});
    }
};

taskController.putTask = async (req, res) => {
    try {
        //const taskId = parseInt(req.params.id);

        /*
          { new: true}
          업데이트 적용된 문서 반환하고 싶을 때
          https://velog.io/@yejin20/mongoose-findOneAndUpdate 
        */
        const taskUpdate = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true}); 
        //const taskUpdate = await Task.updateOne({ task: 'test' }, {isComplete: req.body.isComplete});

        res.status(200).json({status : 'ok', data : taskUpdate});
    } catch (error) {
        res.status(400).json({status : 'fail', error : err});
    }
};

taskController.deleteTask = async (req, res) => {
    try {
        const taskDelete = await Task.findByIdAndDelete(req.params.id);
        //const taskDelete = await Task.deleteMany({ isComplete : true });

        res.status(200).json({status : 'ok', data : taskDelete});
    } catch (error) {
        res.status(400).json({status : 'fail', error : err});
    }
};

module.exports = taskController;