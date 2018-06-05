var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', ()=>{
    it('should generate correct message object', ()=>{
        var messageObject = generateMessage('Mohamed', 'Hello');
        expect(messageObject.from).toBe('Mohamed');
        expect(messageObject.text).toBe('Hello');
        expect(messageObject.createAt).toBeA('number');
    })
})