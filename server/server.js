require('./config/config');
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const _ = require('lodash');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
var {Message} = require('./db/models/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

var users = new Users();

app.use(bodyParser.json());
app.use(express.static(publicPath));


//API
app.post('/chat',(req, res)=>{
    var message = new Message({
        from:req.body.from,
        text:req.body.text,
        createAt:req.body.createAt,
        room:req.body.room
    });
    message.save().then((message)=>{
        res.send(message);
    }).catch((err)=>{
        res.status(400).send(err);
    })
});

app.get('/chat/:room',(req, res)=>{
    var room = req.params.room;
    Message.find({room:room}).then((messages)=>{
        res.send(messages)
    }).catch((err)=>{
        res.status(400).send(err);
    })
})

io.on('connection',(socket)=>{
    console.log('new user connected');



    socket.on('join', (params, callback)=>{
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('name and room name are required.')
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);



        io.to(params.room).emit('updateUserList', users.getUsersList(params.room))
        //socket.leave(params.room);
        //io.emit() => io.to(params.room).emit()
        //socket.emit() =>socket.to(params.room).emit()
        //socket.broadcast.emit() => socket.broadcast.to(params.room).emit()
        socket.emit('newMessage',generateMessage('Admin', 'Welcome to the chat App'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
        



        callback();
    })

    socket.on('createMessage',(message, callback) =>{
        
        var user = users.getUser(socket.id);
        if(user && isRealString(message.text)){

            io.to(user.room).emit('newMessage',generateMessage(user.name, message.text));


        }
          
        callback({
            text:message.text,
            from:user.name,
            room:user.room
        });
    });

    socket.on('createLocationMessage', (coords)=>{
        var user = users.getUser(socket.id);
        if(user){
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
        
    })
    socket.on('disconnect',()=>{
        var user = users.removeUser(socket.id);

        if(user){
            io.to(user.room).emit('updateUserList',users.getUsersList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`))
       }
    });


})



server.listen(port, ()=>{
    console.log(`server run at port ${port}`);
});
