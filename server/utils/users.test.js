const expect = require('expect');

var {Users} =require('./users');

describe('Users',()=>{
    beforeEach(()=>{
        users = new Users();
        users.users = [{
            id:'1',
            name:'Mike',
            room:'room1'
        },{
            id:'2',
            name:'John',
            room:'room1'
        },{
            id:'3',
            name:'Mike',
            room:'room2'
        }]
    });
    it('should add new user', ()=>{
        //var users = new Users();
        var user = {id:'1234', name:'Mohamed', room:'room'};
        var userRes = users.addUser(user.id, user.name, user.room);
        expect(users.users[3]).toEqual(user)
    });

    it('should remove a user',()=>{
        var userId = '2';
        var removedUser = users.removeUser(userId);
        expect(removedUser.id).toBe('2');
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user',()=>{
        var userId = '4';
        var removedUser = users.removeUser(userId);
        expect(removedUser).toNotExist();
        expect(users.users.length).toBe(3);
    });
    it('should find user',()=>{
        var userId = '1';
        var user = users.getUser(userId);
        expect(user.id).toBe(userId);
    });
    it('should not find user',()=>{
        var userId = '5';
        var user = users.getUser(userId);
        expect(user).toNotExist();
    })

    it('sould return names of users of room room1',()=>{
        var userList= users.getUsersList('room1');
        expect(userList).toEqual(['Mike', 'John'])
    });
});