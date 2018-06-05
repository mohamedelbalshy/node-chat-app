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

    socket.on('createMessage',(message)=>{
        console.log(message);
        io.emit('createMessage',{
            from:message.from,
            text:message.text,
            createAt: new Date().getTime()
        })
    });


})



server.listen(port, ()=>{
    console.log(`server run at port ${port}`);
});
