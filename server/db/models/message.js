var mongoose = require('mongoose');

var Message = mongoose.model('Message',{
    from: {type:String
    },text:{
        type:String
    },createAt:{
        type:Number

    },
    room:{
        type:String,
        minlength:1,
        trim:true
    }

});

module.exports={Message};