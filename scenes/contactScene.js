const Scene = require("telegraf/scenes/base")
const Strings = require('../helpers/strings')
const Keyboards = require('../helpers/keyboards')
const Queries = require('../helpers/queries')
const Markup = require('telegraf/markup')
const Extra = require('telegraf/extra')

//контакты
const contactScene = new Scene('contactScene')


contactScene.enter(async ctx=>{
    const lang = ctx.session.lang
    let num = ctx.session.cont_num


    if(num === undefined){
        num = 1
        ctx.session.cont_num = num
    }

    let contacts = await Queries.contact.get(lang)
    let keys = Keyboards.contactsKeyboard(contacts,6,num,lang)

    if(ctx.session.msgid !== undefined){
        ctx.deleteMessage(ctx.session.msgid)
    }
    let mainCont = await Queries.contact.getByTitle('main_cont_'+lang)
    await ctx.reply(mainCont[0].text,Extra.load({disable_web_page_preview:true}))

    if(mainCont[0].lat && mainCont[0].lng){
        ctx.replyWithLocation(mainCont[0].lat,mainCont[0].lng,Markup.keyboard(keys).extra())
    }

    //let msgId = msg.message_id
    //ctx.session.msgid = msgId

})


contactScene.hears([
    Strings.common.ru.back_to_main,
    Strings.common.uz.back_to_main
], ctx=>{
            delete ctx.session.cont_num
            ctx.scene.enter('mainScene')
})



/*
contactScene.hears([
        Strings.common.ru.back,
        Strings.common.uz.back
    ], ctx=>{
        ctx.session.cont_num = --ctx.session.cont_num
        ctx.scene.enter('contactScene')
})


contactScene.hears([
        Strings.common.ru.show_more,
        Strings.common.uz.show_more
    ], ctx=>{
        ctx.session.cont_num = ++ctx.session.cont_num
        ctx.scene.enter('contactScene')
})

contactScene.hears([
        Strings.common.ru.show_on_map,
        Strings.common.uz.show_on_map
    ],async ctx=>{


})


*/
contactScene.on('message',async ctx=>{

    const lang = ctx.session.lang
    const title = ctx.update.message.text

    let contact = await Queries.contact.get(lang)

    for(let i in contact){
        if(contact[i].title === ctx.update.message.text){
            try{
                ctx.replyWithContact(contact[i].text ,contact[i].title + ' ' + Strings.common[lang].title)
            }
            catch(e){
                console.log(e)
            }
        }
    }
})


module.exports = contactScene