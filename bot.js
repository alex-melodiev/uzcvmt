const Telegraf = require("telegraf")
const token = "671670157:AAGsg6zep2t_ec5hNn7WSL-ZKr9860_lTZA";
const bot = new Telegraf(token, {handlerTimeout: 10000})
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


async function startBot() {

    // Start https webhook
    bot.startWebhook('/bot', null, PORT)

        //await bot.telegram.setWebhook(`${URL}/bot`)


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

                            if (messageText) {
                                await bot.telegram.sendPhoto(users[j].chatID, news[i].image, {
                                    caption: messageText,
                                    parse_mode: 'Markdown'
                                })
                            }
                            else {
                                await bot.telegram.sendPhoto(users[j].chatID, news[i].image)
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
}


startBot()



//отлов ошибок промисов
process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
})