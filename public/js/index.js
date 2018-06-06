var socket = io();


socket.on('connect', function(){
    console.log('connected to server');

    socket.on('greetings', function(text){
        console.log(text)

    })



    
});


socket.on('newMessage', function(message){
    console.log(message)
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`)
    jQuery('#messages').append(li);
});





socket.on('disconnect', function(){
    console.log('disconnected from the server',);
});

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();
    socket.emit('createMessage', {
        from:'User',
        text: jQuery('[name=message]').val()
    }, function(){

    });
})







