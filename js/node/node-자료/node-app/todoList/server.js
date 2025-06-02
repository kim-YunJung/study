const express = require('express');
const app = express();

app.listen(8080, function () {
    console.log('listening on 8080');
});

//get
app.get('/', function(req, res){
    res.sendFile(__dirname+'/index.html')
})

app.get('/pet', function(req, res){
    res.send('welcome')
})

/* 
서버 띄기 위한 기본 셋팅 
const express = require('express');
const app = express();

app.listen(8080, function () {});
*/