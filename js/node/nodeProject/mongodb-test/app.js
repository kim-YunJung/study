const { MongoClient } = require("mongodb");
const uri = `mongodb://localhost:27017`;
const client = new MongoClient(uri);

async function run() {
    const database = client.db('firstDB');
    const users = database.collection('users');

    //1건 저장
    /*
    const userData = await users.insertOne({
        name : 'yuni'
        , age : 17
    });

    console.log("result ", userData);
    */

    //다건 저장
    /*
    const userList = [
        { name : 'yun', age : 17}
        , { name : 'jessica', age : 20}
    ];

    const userListResult = await users.insertMany(userList);
    
    console.log("result ", userListResult);
    */

    //한건 검색
    /*
    const findUser = await users.findOne({name : 'yuni'});

    console.log("result ", findUser);
    */

    //모든 검색
    /*
    const findUser = await users.find({}).toArray();

    console.log("result ", findUser);
    */

    //특정 검색 - 20살 보다 많다
    /*
    const findUser = await users.find({age : { $gt : 20}}).toArray();

    console.log("result ", findUser);
    */

    //특정항목을 빼고 검색
    /*
    const findUser = await users.find({name : 'yuni'})
                    .project({_id : 0})//0 제외를 의미
                    .toArray();

    console.log("result ", findUser);
    */

    //특정항목만 검색
    const findUser = await users.find({name : 'yuni'})
                    .project({name : 1})//1 선택을 의미
                    .toArray();

    console.log("result ", findUser);

    //업데이트
    /*
                                            //변경할 대상       //변경할 내용
    const updateUser = await users.updateOne({name : 'yun'}, {$set:{age : 25}});

    console.log("result ", updateUser);
    */

    //삭제
    /*
    const deleteUsers = await users.deleteMany({age : {$gt : 19}});
    console.log("result ", deleteUsers);
    */
}

run();