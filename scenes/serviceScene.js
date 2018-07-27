const Scene = require("telegraf/scenes/base")
const Strings = require('../helpers/strings')
const Keyboards = require('../helpers/keyboards')
const Queries = require('../helpers/queries')
const Markup = require('telegraf/markup')
const Various = require('../helpers/various')

//услуги - анализ и уничтожение
const serviceScene = new Scene('serviceScene')


serviceScene.enter(ctx=>{
    const lang = ctx.session.lang
    if(ctx.session.reentered === undefined){
        ctx.reply(Strings.service.messages[lang].hello,Markup.keyboard(Keyboards.serviceKeyboard(lang)).extra())
    }
    else{
        ctx.reply(ctx.session.msgText,Markup.keyboard(Keyboards.serviceKeyboard(lang)).extra())
        delete ctx.session.reentered
        delete ctx.session.msgText
    }

})


serviceScene.hears([
    Strings.service.keys.ru.contact,
    Strings.service.keys.uz.contact
],async ctx=>{
    const lang = ctx.session.lang
    const type = ctx.session.type
    const data = await Queries.data.get('service_' + type + '_cont_' + lang)

    console.log(data)

    ctx.replyWithContact(data[0].val,Strings.service.messages[lang]['cont_'+ type +'_name'] + ' ' + Strings.common[lang].title)
})

serviceScene.hears([
    Strings.service.keys.ru.contract,
    Strings.service.keys.uz.contract
],ctx=>{
    ctx.scene.enter('contractScene')
})

serviceScene.hears([
    Strings.service.keys.ru.analysis,
    Strings.service.keys.uz.analysis
],ctx=>{
    const lang = ctx.session.lang
    ctx.session.type = 'an'
    ctx.reply(Strings.service.messages[lang].analysis, Markup.keyboard(Keyboards.serviceAnalysisKeyboard(lang)).extra())
})


serviceScene.hears([
    Strings.service.keys.ru.destruction,
    Strings.service.keys.uz.destruction
],ctx=>{
    const lang = ctx.session.lang
    ctx.session.type = 'destr'
    ctx.reply(Strings.service.messages[lang].destruction, Markup.keyboard(Keyboards.serviceDestrKeyboard(lang)).extra())
})


serviceScene.hears([
    Strings.common.ru.back_to_main,
    Strings.common.uz.back_to_main
],ctx=>{
    ctx.scene.enter('mainScene')
})


serviceScene.hears([
    Strings.common.ru.back,
    Strings.common.uz.back
],ctx=>{
    ctx.scene.enter('serviceScene')
})

serviceScene.on('contact',ctx=>{
    let inquiry = {}
    let contact = ctx.update.message.contact
    const lang = ctx.session.lang

    inquiry.phone = contact.phone_number
    inquiry.userId = ctx.update.message.from.id
    inquiry.name = contact.first_name + ' ' + contact.last_name
    inquiry.category = ctx.session.type

    Queries.inquiry.create(inquiry)

    ctx.session.reentered = true
    ctx.session.msgText = Strings.battery.messages[lang].inquiry_saved
    ctx.scene.enter('serviceScene')
})



module.exports = serviceScene