const express = require('express');
const app = express();

/*
app.get("/", (req, res)=>{
    res.send('Hello-');
});

app.get("/about", (req, res)=>{
    res.send('About-');
});

app.post("/about", (req, res)=>{
    res.send('Post About-');
});
app.put("/about", (req, res)=>{
    res.send('Put About-');
});
app.delete("/about", (req, res)=>{
    res.send('Delete About-');
});
*/

const token = null;

//미들웨어
//미들웨어에서는 반드시 next가 필요하다.
const checkAuth = (req, res, next) => {
    console.log(`admin permission`);

    next();
}

const checkToken = (req, res, next) => {
    /* token null로  getUser을 수행하지 못하고 
    don\'t have token 메시지만 출력한다. */
    if(token)
        next();

    res.send('don\'t have token');
}

const getUser = (req, res) => {
    console.log(`user info`);
    res.send('user info');
}

// checkAuth를 실행을 통해 인증절차 등을 한다.
// users로 접속 시, getUser 실행
app.get('/users', checkAuth, checkToken, getUser);

app.listen(5050, () => {
    console.log('server is on 5050');
    //http://localhost:5050/
});