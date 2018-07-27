const Scene = require("telegraf/scenes/base")
const Strings = require('../helpers/strings')
const Keyboards = require('../helpers/keyboards')
const Queries = require('../helpers/queries')
const Markup = require('telegraf/markup')
const Various = require('../helpers/various')
const fs = require('fs')
const http = require('http')
const path = require('path')

//заполнение договора
const contractScene = new Scene('contractScene')

contractScene.enter(ctx=>{
    const lang = ctx.session.lang
    ctx.reply(Strings.service.messages[lang].enter_number,Markup.keyboard([Strings.common[lang].back]).extra())
})


contractScene.hears([
    Strings.common.ru.back,
    Strings.common.uz.back
],
    ctx=>{
        ctx.scene.enter('serviceScene')
})

contractScene.on('message',async ctx=>{
    const num = ctx.update.message.text
    const lang = ctx.session.lang

    if(Various.isNumber(num)){


        let singlePrice = await Queries.data.get('analysis_price')
        singlePrice = singlePrice[0].val
        let price = singlePrice*num

        let file = Various.replaceTemplate(price,singlePrice,num)


        ctx.telegram.sendDocument(ctx.update.message.from.id,{
            url:file,
            filename:'output.docx'
        },{
            caption:Strings.service.messages[lang].contract
        })

    }
    else{
        ctx.reply(Strings.service.messages[lang].incorrect_number)
    }
})

module.exports = contractScene