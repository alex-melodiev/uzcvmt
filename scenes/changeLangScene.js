const Scene = require("telegraf/scenes/base")
const Strings = require('../helpers/strings')
const Keyboards = require('../helpers/keyboards')
const Queries = require('../helpers/queries')


//смена языка
const changeLangScene = new Scene('changeLangScene')

changeLangScene.enter(async ctx=>{
    const user = await Queries.user.get(ctx.update.message.from.id)
    const lang = ctx.session.lang

    if(user.length){
        ctx.session.userId = user[0].id
        let name = ctx.update.message.from.first_name + ' ' + ctx.update.message.from.last_name
        let msg = await ctx.reply(Strings.hello.helloMessage['changelang_' + lang], Keyboards.languageKeyboard)
        let msgId = msg.message_id
        ctx.session.msgid = msgId
    }

})

changeLangScene.on('callback_query',ctx=>{

    const userId = ctx.session.userId
    const user = {}

    user.chatID = ctx.update.callback_query.from.id
    user.name = ctx.update.callback_query.from.first_name + ' ' + ctx.update.callback_query.from.last_name
    user.language = ctx.update.callback_query.data

    Queries.user.update(userId,user)
    ctx.deleteMessage(ctx.session.msgId)
    ctx.session.lang = user.language
    ctx.answerCbQuery()
    ctx.scene.enter('mainScene')
    delete ctx.session.msgId

})


module.exports = changeLangScene