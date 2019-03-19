console.log("is running!!!");

const moment = require('moment');

setInterval(function () {
    console.log(moment.now()+"test");
}, 1000);
