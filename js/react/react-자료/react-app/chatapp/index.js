const {createServer} = require('http')
const app = require("./app")
const {Server} = require('socket.io');

require('dotenv').config();

const httpServer = createServer(app)
const io = new Server(httpServer,{
  cors : {
    origin: "http://localhost:3000"
  }
})

//io.js파일에 io를 넘겨준다.
require('./utils/io')(io);

httpServer.listen(process.env.PORT, ()=>{
  console.log("server listening on port ", process.env.PORT)
})