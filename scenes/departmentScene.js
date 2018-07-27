const Scene = require('telegraf/scenes/base')
const Strings = require('../helpers/strings')
const Queries = require('../helpers/queries')
const Markup = require('telegraf/markup')
const Various = require('../helpers/various')
const fs = require('fs')
const URL = require('url')

//список областей и отделений
const departmentScene = new Scene('departmentScene')

departmentScene.enter(async ctx=>{
    const lang = ctx.session.lang
    const districts = await Queries.district.get(lang)
    const type = ctx.session.type
    let keys = []

    console.log(districts)

    for(let i in districts){
        if((type === 'akb' || type === 'metal') && !Various.isEmpty(districts[i].departments))
        keys.push(districts[i].title)

        if(type === 'contacts' && !Various.isEmpty(districts[i].contacts))
        keys.push(districts[i].title)
    }

    keys.push(Strings.common[lang].back)
    ctx.reply(Strings.district.messages[lang].select_distr,Markup.keyboard(keys).extra())

    ctx.session.districts = JSON.stringify(districts)
})

departmentScene.hears([
    Strings.common.ru.back,
    Strings.common.uz.back
],ctx=>{
    let sceneName

    switch (ctx.session.type) {
        case 'akb':
            sceneName = 'batteryScene'
            break
        case 'metal':
            sceneName = 'metalScene'
            break
        case 'contacts':
            sceneName = 'mainScene'
            break;
        default: sceneName = 'batteryScene'
    }
    ctx.scene.enter(sceneName)
})

departmentScene.on('message',async ctx=>{

    const lang = ctx.session.lang
    const districts = JSON.parse(ctx.session.districts)
    const type = ctx.session.type
    const title = ctx.update.message.text
    let inList = false

    for(let i in districts){
        if(districts[i].title === title){
            inList = true

            if(type === 'akb' || type === 'metal'){
                let departments = districts[i].departments
                for(let j in departments){

                        let messageText = ""

                        if(departments[j].type==='both' || departments[j].type===ctx.session.type){
                            messageText += '*' + departments[j].title + '*\n'
                            messageText += departments[j].address + '\n'
                            messageText += Strings.battery.messages[lang].contact_person + ': ' + departments[j].contact_person + '\n'
                            messageText += departments[j].phone + '\n\n'
                        }

                        let hasCoords = departments[j].latitude && departments[j].longitude

                        try{
                            if(messageText){
                                if(departments[j].image && hasCoords){
                                    await ctx.replyWithPhoto(departments[j].image,{
                                        caption:messageText,
                                        parse_mode:'Markdown'
                                    })
                                    await ctx.replyWithLocation(departments[j].latitude,departments[j].longitude)
                                }
                                else{
                                    if(departments[j].image && !hasCoords)
                                        ctx.replyWithPhoto(departments[j].image,{
                                            caption:messageText,
                                            parse_mode:'Markdown'
                                        })
                                    else{
                                        if(!departments[j].image && hasCoords){
                                            await ctx.replyWithMarkdown(messageText)
                                            await ctx.replyWithLocation(departments[j].latitude,departments[j].longitude)
                                        }
                                        else{
                                            ctx.replyWithMarkdown(messageText)
                                        }
                                    }
                                }

                            }
                        }
                        catch(e){
                            console.log(e)
                        }

                }
            }
        break
        }
    }

    if(!inList){
        ctx.reply(Strings.district.messages[lang].incorrect_distr)
    }

})

module.exports = departmentScene