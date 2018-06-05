const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('new user connected');
    socket.on('disconnect',()=>{
        console.log('User was disconnected');
    });




    socket.emit('newMessage',{
        from:'Mohamed',
        text:'Hello',
        creatAt:1256
    });

    socket.on('createMessage',(message)=>{
        console.log(message)
    })


})



server.listen(port, ()=>{
    console.log(`server run at port ${port}`);
});
