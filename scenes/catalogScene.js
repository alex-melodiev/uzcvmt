const Scene = require("telegraf/scenes/base")
const Strings = require('../helpers/strings')
const Keyboards = require('../helpers/keyboards')
const Queries = require('../helpers/queries')
const Markup = require('telegraf/markup')
const Extra = require('telegraf/extra')


//список товаров
const catalogScene = new Scene('catalogScene')


catalogScene.enter(async ctx=>{
    const lang = ctx.session.lang
    let documentData = []
    if(ctx.session.type === 'vacancies'){
        documentData = await Queries.data.get('main_scene_vacancies_'+lang)
    }
    else{
        documentData = await Queries.data.get('main_scene_catalog_'+lang)
    }

    let message = documentData[0].val.split('%%%%')[0]
    let buttons = documentData[0].val.split('%%%%')[1]

    console.log(buttons)

    buttons = JSON.parse(buttons)

    ctx.session.buttons = JSON.stringify(buttons)
    let keys = Keyboards.catalogKeyboard(lang,buttons)
    ctx.replyWithMarkdown(message,Markup.keyboard(keys).resize().extra())
})



catalogScene.hears([
    Strings.service.keys.ru.contact,
    Strings.service.keys.uz.contact
],async ctx=>{
    const lang = ctx.session.lang
    let data = []
    if(ctx.session.type==='vacancies') {
        data = await Queries.data.get('vacancies_contact_' + lang)
        ctx.replyWithContact(data[0].val, Strings.common[lang].hr + ' ' + Strings.common[lang].title)
    }
    else {
        data = await Queries.data.get('catalog_contact_' + lang)
        ctx.replyWithContact(data[0].val, Strings.common[lang].sales + ' ' + Strings.common[lang].title)
    }

})




catalogScene.hears([
    Strings.common.ru.back,
    Strings.common.uz.back
],ctx=>{
    delete ctx.session.type
    delete ctx.session.buttons
    ctx.scene.enter('mainScene')
})




catalogScene.on('contact',async ctx=>{
    let inquiry = {}
    let contact = ctx.update.message.contact
    const lang = ctx.session.lang

    inquiry.phone = contact.phone_number
    inquiry.userId = ctx.update.message.from.id
    inquiry.name = contact.first_name + ' ' + contact.last_name
    if(ctx.session.type === 'vacancies'){
        inquiry.category = 'Вакансии'
    }
    else
    inquiry.category = 'Каталог товаров'

    await Queries.inquiry.create(inquiry)

    console.log(ctx.session.lang)
    await ctx.reply(Strings.metal.messages[lang].inquiry_saved)
    //ctx.scene.enter('mainScene')
})




catalogScene.on('message',ctx=>{
    let buttons = JSON.parse(ctx.session.buttons)
    let msgText = ctx.update.message.text

    for(let i in buttons){
        if(buttons[i].text !== undefined){
            if(msgText === buttons[i].text){
                ctx.reply(buttons[i].url)
                break
            }
        }
        else{
            for(let j in buttons[i]){
                if(buttons[i][j].text === msgText){
                    ctx.reply(buttons[i][j].url)
                    break
                }
            }
        }
    }

})



module.exports = catalogScene