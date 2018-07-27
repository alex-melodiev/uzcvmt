const Scene = require("telegraf/scenes/base")
const Strings = require('../helpers/strings')
const Keyboards = require('../helpers/keyboards')
const Queries = require('../helpers/queries')
const Markup = require('telegraf/markup')
const Various = require('../helpers/various')

//сдача аккумуляторов
const batteryScene = new Scene('batteryScene')

batteryScene.enter(ctx=>{
    const lang = ctx.session.lang
    const messages = Strings.battery.messages[lang]
    if(ctx.session.reenter === undefined){
        ctx.reply(messages.hello , Markup.keyboard(Keyboards.batteryKeyboard(lang)).extra())
    }
    else{
        ctx.replyWithMarkdown(ctx.session.msgText , Markup.keyboard(Keyboards.batteryKeyboard(lang)).extra())
        delete ctx.session.reenter
        delete ctx.session.msgText
    }

})

batteryScene.hears([Strings.common.ru.back_to_main,Strings.common.uz.back_to_main],ctx=>{
    ctx.scene.enter('mainScene')
})

batteryScene.on('contact',ctx=>{
    let inquiry = {}
    let contact = ctx.update.message.contact
    const lang = ctx.session.lang

    inquiry.phone = contact.phone_number
    inquiry.userId = ctx.update.message.from.id
    inquiry.name = contact.first_name + ' ' + contact.last_name
    inquiry.category = 'АКБ'

    Queries.inquiry.create(inquiry)

    ctx.session.reenter = true
    ctx.session.msgText = Strings.battery.messages[lang].inquiry_saved
    ctx.scene.enter('batteryScene')
})

batteryScene.hears([
    Strings.battery.keys.ru.addresses,
    Strings.battery.keys.uz.addresses
], async ctx=>{

    ctx.session.type = 'akb'
    ctx.scene.enter('departmentScene')
})

batteryScene.hears([
    Strings.battery.keys.ru.nearest,
    Strings.battery.keys.uz.nearest
],ctx=>{
    const lang = ctx.session.lang
    ctx.reply(Strings.battery.messages[lang].req_location,Markup.keyboard(Keyboards.requestLocation(lang)).extra())
})

batteryScene.on('location',async ctx=>{

    const lang = ctx.session.lang
    const lat = Various.toRadians(ctx.update.message.location.latitude)
    const lng = Various.toRadians(ctx.update.message.location.longitude)

    let departments = await Queries.department.get(lang)

    let way = 999999999
    let depId = 0

    for(let i in departments){
        if(departments[i].type === "both" || departments[i].type === "akb"){
            let tempLat = Various.toRadians(departments[i].latitude)
            let tempLng = Various.toRadians(departments[i].longitude)
            let tempWay = 6371*Math.acos(Math.sin(lat)*Math.sin(tempLat) + Math.cos(lat)*Math.cos(tempLat)*Math.cos(lng - tempLng))

            if(tempWay < way){
                way = tempWay
                depId = i
            }
        }
    }

    way = way.toFixed(2);
    let message = ""
    message += '*' + Strings.battery.messages[lang].nearest_dep + '*\n'
    message += Strings.battery.messages[lang].way + ': ' + way + Strings.battery.messages[lang].km + '\n'
    message += departments[depId].title + '\n'
    message += departments[depId].address + '\n'
    message += Strings.battery.messages[lang].contact_person + ': ' + departments[depId].contact_person + '\n'
    message += departments[depId].phone + '\n\n'

    ctx.replyWithLocation(departments[depId].latitude,departments[depId].longitude)
    //ctx.replyWithMarkdown(message)

    ctx.session.reenter = true
    ctx.session.msgText = message
    ctx.scene.enter('batteryScene')


})

batteryScene.hears([
        Strings.battery.keys.ru.contact,
        Strings.battery.keys.uz.contact
    ], async ctx=>{
        const lang = ctx.session.lang

        let data = await Queries.data.get('battery_contact_'+lang)

        console.log(data)
        ctx.replyWithContact(data[0].val,Strings.battery.messages[lang].cont_name + ' ' + Strings.common[lang].title)
    })

batteryScene.hears([
    Strings.battery.keys.ru.request_call,
    Strings.battery.keys.uz.request_call
],ctx=>{
    const lang = ctx.session.lang
    ctx.reply(Strings.battery.messages[lang].send_contact , Markup.keyboard(Keyboards.requestContact(lang)).extra())
})

batteryScene.hears([
    Strings.common.ru.back,
    Strings.common.uz.back
],ctx=>{
    ctx.scene.enter('batteryScene')
})

module.exports = batteryScene