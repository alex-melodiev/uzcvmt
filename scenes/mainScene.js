//подключаем используемые компоненты

//функциональность сценариев
const Scene = require("telegraf/scenes/base")
//перевод строк
const Strings = require('../helpers/strings')
//клавиатуры
const Keyboards = require('../helpers/keyboards')
//запросы к админке
const Queries = require('../helpers/queries')
//различные другие функции
const Various = require('../helpers/various')
//разметка телеграма (клавиатуры и т.д.)
const Markup = require('telegraf/markup')

//главное меню
const mainScene = new Scene('mainScene')

//действия при входе
mainScene.enter(ctx=>{
    const lang = ctx.session.lang
    ctx.reply(Strings.main.mainKeyboard[lang].message,Markup.keyboard(Keyboards.mainKeyboard(lang)).extra())
})

/*
*
* PROVIDE OTHER SCENES
*
* */

//если юзер нажал на "сдать батарею"
mainScene.hears([
    Strings.main.mainKeyboard.ru.give_battery,
    Strings.main.mainKeyboard.uz.give_battery
],ctx=>{
    //переход к сценарию со сдачей
    ctx.scene.enter('batteryScene')
})

//аналогично первому
mainScene.hears([
    Strings.main.mainKeyboard.ru.give_metal,
    Strings.main.mainKeyboard.uz.give_metal
],ctx=>{
    ctx.scene.enter('metalScene')
})

mainScene.hears([
    Strings.main.mainKeyboard.ru.service,
    Strings.main.mainKeyboard.uz.service
],ctx=>{
    ctx.scene.enter('serviceScene')
})

mainScene.hears([
    Strings.main.mainKeyboard.ru.complain,
    Strings.main.mainKeyboard.uz.complain
],ctx=>{
    ctx.scene.enter('complainScene')
})

mainScene.hears([
    Strings.main.mainKeyboard.ru.contacts,
    Strings.main.mainKeyboard.uz.contacts
],ctx=>{
    ctx.scene.enter('contactScene')
})



/*
*MESSAGE COMMANDS
*/

mainScene.hears([
    Strings.main.mainKeyboard.ru.vacancies,
    Strings.main.mainKeyboard.uz.vacancies
],async ctx=>{
    ctx.session.type = 'vacancies'
    ctx.scene.enter('catalogScene')
})

mainScene.hears([
    Strings.main.mainKeyboard.ru.prices,
    Strings.main.mainKeyboard.uz.prices
], async ctx=>{
    ctx.session.type = 'prices'
    ctx.scene.enter('documentScene')
})

mainScene.hears([
    Strings.main.mainKeyboard.ru.products,
    Strings.main.mainKeyboard.uz.products
], async ctx=>{
    ctx.scene.enter('catalogScene')
})

mainScene.hears([
    Strings.main.mainKeyboard.ru.documentation,
    Strings.main.mainKeyboard.uz.documentation
], async ctx=>{
    ctx.session.type = 'documents'
    ctx.scene.enter('documentScene')
})


mainScene.hears([
    Strings.main.mainKeyboard.ru.requisites,
    Strings.main.mainKeyboard.uz.requisites
], async ctx=>{
    const lang = ctx.session.lang
    let data = await Queries.data.get('requisites_'+lang)
    if(!Various.isEmpty(data))
    ctx.replyWithMarkdown(data[0].val)
})


mainScene.hears([
    Strings.main.mainKeyboard.ru.language,
    Strings.main.mainKeyboard.uz.language
], async ctx=>{
    ctx.scene.enter('changeLangScene')
})


module.exports = mainScene