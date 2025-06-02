const figlet = require('figlet');

const express = require('express');
const app = express();

const cors = require('cors');

app.use(express.json())
app.use(cors());

figlet('Hello World !! ', function(err, data){
    if(err){
        console.log('something went wrong ...')
        console.dir(err);
        return;
    }

    console.log(data);
})

const port = 3000;

app.get('/', function(req, res){
    res.send('Hello World')
})

app.get('/page', function(req, res){
    /* 페이지 전송 */
    res.sendFile(__dirname+'/index.html')
})

app.get('/dog', (req, res)=>{
    /* json 전송 */
    res.json({'sond':'wang wang'})
})

/* http://localhost:3000/sound/cat */
app.get('/sound/:name', (req, res)=>{
    /* const param = req.params;
       const name = param.name;
       와 동일한 내용이다.
    */
    const {name} = req.params;

    if(name == "dog")
        res.json({'sond':'멍멍'})
    else if(name == "cat")
        res.json({'sond':'야옹야옹'})
})

/* :id 파라미터를 받는다. 
http://localhost:3000/user/1*/
app.get('/user/:id', (req, res)=>{
    const param = req.params;
    console.log('param >> ',param);

    res.json({'id':param.id})
})

/*query 
http://localhost:3000/users/1?id=1&name=kim*/
app.get('/user2/:id', (req, res)=>{
    const param = req.query;
    console.log('param >> ',param);

    res.json({'id':param.id})
})

app.post('/user3/:id', (req, res)=>{
    const param = req.params;
    console.log('param >> ', param);

    const param2 = req.body;
    console.log('param2 >> ', param2)
})

app.listen(port, ()=>{
    console.log('app listening on port ', port);
})