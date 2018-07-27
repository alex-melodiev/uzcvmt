const Scene = require("telegraf/scenes/base")
const Strings = require('../helpers/strings')
const Keyboards = require('../helpers/keyboards')
const Queries = require('../helpers/queries')
const Markup = require('telegraf/markup')
const Various = require('../helpers/various')

//сдача металла
const metalScene = new Scene('metalScene')


metalScene.enter(ctx=>{
    const lang = ctx.session.lang
    const messages = Strings.metal.messages[lang]
    if(ctx.session.reenter === undefined){
        ctx.reply(messages.hello , Markup.keyboard(Keyboards.metalKeyboard(lang)).extra())
    }
    else{
        ctx.replyWithMarkdown(ctx.session.msgText , Markup.keyboard(Keyboards.metalKeyboard(lang)).extra())
        delete ctx.session.reenter
    }
})


metalScene.on('contact',ctx=>{
    let inquiry = {}
    let contact = ctx.update.message.contact
    const lang = ctx.session.lang

    inquiry.phone = contact.phone_number
    inquiry.userId = ctx.update.message.from.id
    inquiry.name = contact.first_name + ' ' + contact.last_name
    inquiry.category = 'Метал'

    Queries.inquiry.create(inquiry)

    ctx.session.reenter = true
    ctx.session.msgText = Strings.metal.messages[lang].inquiry_saved
    ctx.scene.enter('metalScene')
})


metalScene.on('location',async ctx=>{

    const lang = ctx.session.lang
    const lat = Various.toRadians(ctx.update.message.location.latitude)
    const lng = Various.toRadians(ctx.update.message.location.longitude)

    let departments = await Queries.department.get(lang)

    let way = 999999999
    let depId = 0

    for(let i in departments) {
        if (departments[i].type === "both" || departments[i].type === "metal") {
            let tempLat = Various.toRadians(departments[i].latitude)
            let tempLng = Various.toRadians(departments[i].longitude)
            let tempWay = 6371 * Math.acos(Math.sin(lat) * Math.sin(tempLat) + Math.cos(lat) * Math.cos(tempLat) * Math.cos(lng - tempLng))

            if (tempWay < way) {
                way = tempWay
                depId = i
            }
        }
    }

    way = way.toFixed(2);
    let message = ""
    message += '*' + Strings.metal.messages[lang].nearest_dep + '*\n'
    message += Strings.metal.messages[lang].way + ': ' + way + Strings.metal.messages[lang].km + '\n'
    message += departments[depId].title + '\n'
    message += departments[depId].address + '\n'
    message += Strings.metal.messages[lang].contact_person + ': ' + departments[depId].contact_person + '\n'
    message += departments[depId].phone + '\n\n'

    ctx.replyWithLocation(departments[depId].latitude,departments[depId].longitude)

    ctx.session.reenter = true
    ctx.session.msgText = message
    ctx.scene.enter('metalScene')


})


metalScene.hears([
    Strings.common.ru.back_to_main,
    Strings.common.uz.back_to_main
],ctx=>{
    ctx.scene.enter('mainScene')
})


metalScene.hears([
    Strings.metal.keys.ru.metal_list,
    Strings.metal.keys.uz.metal_list
],async ctx=>{
    const lang = ctx.session.lang
    let data = await Queries.data.get('metal_list_'+lang)
    ctx.replyWithDocument(data[0].val)
})


metalScene.hears([
        Strings.metal.keys.ru.addresses,
        Strings.metal.keys.uz.addresses
    ], async ctx=>{
        ctx.session.type = 'metal'
        ctx.scene.enter('departmentScene')
    })


metalScene.hears([
    Strings.metal.keys.ru.nearest,
    Strings.metal.keys.uz.nearest
],ctx=>{
    const lang = ctx.session.lang
    ctx.reply(Strings.metal.messages[lang].req_location,Markup.keyboard(Keyboards.requestLocation(lang)).extra())
})


metalScene.hears([
        Strings.metal.keys.ru.contact,
        Strings.metal.keys.uz.contact
    ], async ctx=>{
        const lang = ctx.session.lang
        let data = await Queries.data.get('metal_contact_'+lang)
        ctx.replyWithContact(data[0].val,Strings.metal.messages[lang].cont_name + ' ' + Strings.common[lang].title)
    })


metalScene.hears([
        Strings.metal.keys.ru.prices,
        Strings.metal.keys.uz.prices
    ], async ctx=>{
        const lang = ctx.session.lang
        let data = await Queries.data.get('metal_prices_link_'+lang)
        ctx.reply(data[0].val)
    })


metalScene.hears([
    Strings.metal.keys.ru.request_call,
    Strings.metal.keys.uz.request_call
],ctx=>{
    const lang = ctx.session.lang
    ctx.reply(Strings.metal.messages[lang].send_contact , Markup.keyboard(Keyboards.requestContact(lang)).extra())
})


metalScene.hears([
    Strings.common.ru.back,
    Strings.common.uz.back
],ctx=>{
    ctx.scene.enter('metalScene')
})


module.exports = metalScene