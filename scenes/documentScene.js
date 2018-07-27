const Scene = require("telegraf/scenes/base")
const Strings = require('../helpers/strings')
const Keyboards = require('../helpers/keyboards')
const Queries = require('../helpers/queries')
const Markup = require('telegraf/markup')
const Various = require('../helpers/various')

//список документов, цен и вакансий
const documentScene = new Scene('documentScene')

documentScene.hears([
    Strings.common.ru.back_to_main,
    Strings.common.uz.back_to_main
],ctx=>{
    delete ctx.session.buttons
    delete ctx.session.type
    ctx.scene.enter('mainScene')
})

documentScene.enter(async ctx=>{

    const lang = ctx.session.lang
    const type = ctx.session.type
    let documentData
    switch (type){
        case 'documents':
            documentData = await Queries.data.get('main_scene_documents_'+lang)
            break
        case 'prices':
            documentData = await Queries.data.get('main_scene_prices_'+lang)
            break
        case 'vacancies':
            documentData = await Queries.data.get('main_scene_vacancies_'+lang)
            break
    }

    console.log(documentData)
    let message = documentData[0].val.split('%%%%')[0]
    let buttons = documentData[0].val.split('%%%%')[1].replace('\'','"')
    buttons = JSON.parse(buttons)
    let keys = Keyboards.documentKeyboard(buttons,lang)

    ctx.session.buttons = JSON.stringify(buttons)

    ctx.replyWithMarkdown(message,Markup.keyboard(keys,{columns: parseInt(ctx.match[1])}).resize().extra())

});


documentScene.on('message',ctx=>{

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



module.exports = documentScene