const nodemailer = require('nodemailer');
const senderInfo = require('./config/senderInfo.json');

const mailSender = {   
    //메일 전송을 위한 계정정보
    send : function (option) {
        //관리자 계정정보
        let email = {
            service: "daum",
            host: "smtp.daum.net",
            secure: false,  
            requireTLS: true ,
            port: 465,
            auth: {
                user : senderInfo.user,
                pass : senderInfo.pass,
            },
        };
    
        nodemailer.createTransport(email)
        .sendMail(option, (err, info) => {
            if(err){
                console.log(err);
            }else{
                console.log(info);
                return info.response;
            }                
        });
    }
}

module.exports = mailSender;

/*
참조 
https://www.youtube.com/watch?v=yaeZ17QYxVs&ab_channel=%EA%B0%9C%EB%B0%9C%EC%9E%90%EC%9D%98%ED%92%88%EA%B2%A9

https://devlog-wjdrbs96.tistory.com/234
https://shadesign.tistory.com/16
https://minu0807.tistory.com/155
*/