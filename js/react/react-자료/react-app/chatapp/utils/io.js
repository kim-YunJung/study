const chatController = require("../Controllers/chat.controller");
const userController = require("../Controllers/user.controller")

module.exports = function(io){
    io.on("connection ", async(socket)=>{
        console.log("client is connected ", socket.id);

        /* App.js에서 socket.emit("login" 로 호출하면 아래에서 받는다. */
        socket.on("login", async(userName, cb) => {
            console.log("backend ", userName);

            try {
                //유저정보를 저장
                const user = await userController.saveUser(userName, socket.id);
                
                //시스템 메시지 예)00님이 입장하셨습니다. 등
                const welcomeMessage = {
                    char : `${user.name} is joined to this room`
                    , user : {id : null, name : 'system'}
                }

                //해당 서버에 접속한 모두에게 알림
                io.emit("message", welcomeMessage);

                //cb = 콜백 함수
                cb({ok:true, data:user})
            } catch (error) {
                cb({ok:false, error:error.message})
            }
        })

        socket.io("sendMessage", async(message, cb) => {
            try {
                //유저찾기
                const user = await userController.checkUser(socket.id);    

                //메시지 저장
                let newMessage = await chatController.saveChat(message, user);

                //해당 서버에 접속한 모두에게 알림
                io.emit("message", newMessage);

                cb({or:true})
            } catch (error) {
                cb({ok:false, error:error.message})
            }
        })

        socket.io("disconnect", () => {
            console.log("user is disconnected");
        })
    })
} 