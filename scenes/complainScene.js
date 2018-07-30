const Scene = require("telegraf/scenes/base")
const Strings = require('../helpers/strings')
const Keyboards = require('../helpers/keyboards')
const Queries = require('../helpers/queries')
const Markup = require('telegraf/markup')

//подача жалобы
const complainScene = new Scene('complainScene')

complainScene.hears([
        Strings.common.ru.back_to_main,
        Strings.common.uz.back_to_main],
    ctx=>{
        delete ctx.session.complaint
        ctx.scene.enter('mainScene')
})


complainScene.enter(ctx=>{
    const lang = ctx.session.lang
    ctx.session.complaint = JSON.stringify({})
    ctx.reply(Strings.complain.messages[lang].hello,Markup.keyboard(Keyboards.complainKeyboard(lang)).extra())
})


complainScene.hears([
    Strings.complain.keys.ru.anonymous,
    Strings.complain.keys.uz.anonymous],
    ctx=>{
        const lang = ctx.session.lang
        ctx.reply(Strings.complain.messages[lang].insert_text , Markup.keyboard([Strings.common[lang].back_to_main]).extra())
})


complainScene.on('contact',ctx=>{
    if(ctx.session.complaint!==undefined) {
        let complaint = JSON.parse(ctx.session.complaint)
        let contact = ctx.update.message.contact
        const lang = ctx.session.lang

        complaint.user_phone = contact.phone_number
        complaint.user_name = contact.first_name + ' ' + contact.last_name
        complaint.anonymous = false

        ctx.session.complaint = JSON.stringify(complaint)

        ctx.reply(Strings.complain.messages[lang].insert_text, Markup.keyboard([Strings.common[lang].back_to_main]).extra())
    }
})


complainScene.on('message',async ctx=>{

    if(ctx.session.complaint !== undefined){
        const lang = ctx.session.lang

        let complaint = JSON.parse(ctx.session.complaint)
        complaint.complaint = ctx.update.message.text
        Queries.complaint.create(complaint)

        ctx.session.msgText = Strings.complain.messages[lang].message_receipt
        ctx.session.reentered = true

        delete ctx.session.complaint
        ctx.scene.enter('mainScene')
    }




})



module.exports = complainScene