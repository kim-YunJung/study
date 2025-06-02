const User = require('../Models/user');

const userController = {}

//유저정보 저장(유저이름, 소켓 아이디 = 토큰으로 사용)
userController.saveUser = async (userName, sid) => {
    //존재하는 유저인지 확인 
                    //유저 이름을 통해서 조회
    let user = await User.findOne({name : userName})

    //없다면 새로운 유저정보 만들기
    if(!user){
        User = new User({
            name : userName
            , token : sid
            , online : true
        });
    }

    //존재하면 연결정보 토큰값 변경
    user.token = sid;
    user.online = true;

    //유저 정보 저장
    await user.save();

    return user;
}

//유저검색
userController.checkUser = async (sid) => {
    let user = await User.findOne({token : sid});

    if(!user) throw new Error("user not found");

    return user;
}

module.exports = userController