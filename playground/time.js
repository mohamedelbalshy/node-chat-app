const moment = require('moment');

var createAt = 123456;
var date = moment(createAt);
console.log(date.format('h:mm a'))