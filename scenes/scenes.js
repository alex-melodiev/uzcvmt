const Stage = require('telegraf/stage')

//подключение всех сценариев
module.exports = new Stage([
    require('./helloScene'),
    require('./mainScene'),
    require('./batteryScene'),
    require('./metalScene'),
    require('./serviceScene'),
    require('./complainScene'),
    require('./departmentScene'),
    require('./contractScene'),
    require('./catalogScene'),
    require('./contactScene'),
    require('./changeLangScene'),
    require('./documentScene')
],{ttl:1000})