var socket = io();
socket.on('connect', function(){
    console.log('connected to server');




    socket.on('createMessage',function(message){
        console.log(message);
    });
    
});



socket.on('disconnect', function(){
    console.log('disconnected from the server');
});





