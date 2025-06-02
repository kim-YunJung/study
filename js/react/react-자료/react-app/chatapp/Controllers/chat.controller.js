const Char = require('../Models/chat');

const chatController = {}

chatController.saveChat = async (message, user) => {
    let newMessage = new Char({
            chat : message,
            user : {
                id : user._id
                , name : user.name
            }
        });

    await newMessage.save();
    return newMessage;
}

module.exports = chatController;