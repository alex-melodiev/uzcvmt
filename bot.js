const Telegraf = require("telegraf")
const token = "658752174:AAGNtHbFQ8gs11G-psgIScKJ5QF9S7Mkabo";
const bot = new Telegraf(token, {handlerTimeout: 3000})
const Session = require('telegraf/session')
const stage = require('./scenes/scenes')
const Queries = require('./helpers/queries')
const Various = require('./helpers/various')


//Использование сессии для хранения данных
bot.use(Session())
//использование сцен telegraf
bot.use(stage.middleware())


//реакция на команду start
bot.command('start', ctx => {
    //переход к сценарию
    ctx.scene.enter('helloScene')
})


//реакция на любое другое сообщение
bot.on('message', ctx => {
    if (ctx.scene.current === null) {
        ctx.scene.enter('helloScene')
    }
})


const PORT = process.env.PORT || 3000;
const URL = 'https://uvcm.herokuapp.com';

bot.webhookReply = false;
bot.telegram.setWebhook(`${URL}/bot`).catch((err) => console.log(err));

// Start https webhook
bot.startWebhook('/bot', null, PORT)
bot.webhookReply = false;

//проверка свежих новостей
setInterval(async () => {

    //получаем новости
    let news = await Queries.news.getNew()

    //если они есть
    if (!Various.isEmpty(news)) {

        //получаем юзеров
        let users = await Queries.user.getAll()

        //отправляем каждую новость каждому юзеру
        for (let i in news) {
            let messageText = ""

            if (news[i].title) messageText += '*' + news[i].title + '*\n'
            messageText += news[i].text


            for (let j in users) {
                try {
                    if (news[i].image) {//если у новости есть изображение, посылаем его

                        if (messageText.length < 200) {
                            await bot.telegram.sendPhoto(users[j].chatID, news[i].image, {
                                caption: messageText,
                                parse_mode: 'Markdown'
                            })
                        }
                        else {
                            await bot.telegram.sendPhoto(users[j].chatID, news[i].image)
                            await bot.telegram.sendMessage(users[j].chatID,messageText,{
                                parse_mode: 'Markdown'
                            })
                        }

                    }
                    else {//иначе посылаем только текст
                        await bot.telegram.sendMessage(users[j].chatID, messageText, {
                            parse_mode: 'Markdown'
                        })

                    }
                }
                catch (e) {
                    console.log(e)
                }
            }


            //помечаем новость как прочитанную
            news[i].was_sent = '1'
            Queries.news.update(news[i].id, news[i])
        }

    }

}, 60000)




//отлов ошибок промисов
process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
})