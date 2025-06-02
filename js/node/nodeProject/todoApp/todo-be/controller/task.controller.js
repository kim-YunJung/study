const Task = require("../model/Task");

const taskController = {};

taskController.createTask = async (req, res) => {
    try {
        //req에 담겨져있는 데이터를 변수에 담는다.
        const {task, isComplete} = req.body;
        const newTask = new Task({task, isComplete});

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
        const taskList = await Task.find({}).select("-__v");

        //상태를 알려준다.
        res.status(200).json({status : 'ok', data : taskList});
    } catch (error) {
        res.status(400).json({status : 'fail', error : err});
    }
};

taskController.putTask = async (req, res) => {
    try {
        const taskId = parseInt(req.params.id);

        const taskUpdate = await Task.updateOne({ taskId }, {isComplete: req.body.isComplete}); 
        //const taskUpdate = await Task.updateOne({ task: 'test' }, {isComplete: req.body.isComplete});

        res.status(200).json({status : 'ok', data : taskUpdate});
    } catch (error) {
        res.status(400).json({status : 'fail', error : err});
    }
};

taskController.deleteTask = async (req, res) => {
    try {
        const taskId = parseInt(req.params.id);

        const taskDelete = await Task.deleteOne({ taskId });
        //const taskDelete = await Task.deleteMany({ isComplete : true });

        res.status(200).json({status : 'ok', data : taskDelete});
    } catch (error) {
        res.status(400).json({status : 'fail', error : err});
    }
};

module.exports = taskController;