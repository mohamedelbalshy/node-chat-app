var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', ()=>{
    it('should generate correct message object', ()=>{
        var messageObject = generateMessage('Mohamed', 'Hello');
        expect(messageObject.from).toBe('Mohamed');
        expect(messageObject.text).toBe('Hello');
        expect(messageObject.createAt).toBeA('number');
    })
});

describe('generateLocationMessage', ()=>{
    it('should generate correct location message',()=>{
        var from='Deb';
        var lat = 15;
        var long = 19;
        var url = 'https://www.google.com/maps?q=15,19';
        var message = generateLocationMessage(from, lat, long);
        expect(message.from).toBe(from);
        expect(message.url).toBe(url);
        expect(message.createAt).toBeA('number');
        
    })
})