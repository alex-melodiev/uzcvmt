const Markup = require('telegraf/markup')
const Strings = require('./strings')
const Queries = require('./queries')

//генерация клавиатур

module.exports = {
    //клавиатура в списке товаров
    catalogKeyboard:(lang,buttons)=>{

        let res = []

        for(let i in buttons){
            if(buttons[i].text !== undefined)
                res.push([buttons[i].text])
            else{
                let midRes = []
                for(let j in buttons[i]){
                    midRes.push(buttons[i][j].text)
                }
                res.push(midRes)
            }
        }

        res.push( [Markup.contactRequestButton(Strings.service.keys[lang].request_call)],
            [Strings.service.keys[lang].contact],
            [Strings.common[lang].back])

        return res
    },
    //клавиатура выбора языка
    languageKeyboard: Markup.inlineKeyboard([
            Markup.callbackButton('🇺🇿 O\'zbek tili', 'uz'),
            Markup.callbackButton('🇷🇺 Русский язык', 'ru')
        ]).extra(),
    //главная клавиатура
    mainKeyboard:lang=>{
        let keyStrings = Strings.main.mainKeyboard[lang]
        let keys = [
            [ keyStrings.give_battery , keyStrings.give_metal ],
            [ keyStrings.prices , keyStrings.service ],
            [ keyStrings.complain , keyStrings.documentation ],
            [ keyStrings.contacts , keyStrings.requisites ],
            [ keyStrings.language ]
        ]
        return keys
    },
    //клавиатура сдачи батареи
    batteryKeyboard:lang=>{
        let keyStrings = Strings.battery.keys[lang]
        let keys = [
            [ keyStrings.nearest ],
            [ keyStrings.addresses],
            [ keyStrings.contact ],
            [ keyStrings.request_call ],
            [ keyStrings.back_to_main ]
        ]
        return keys
    },
    //кдавиатура сдачи металла
    metalKeyboard:lang=>{
        let keyStrings = Strings.metal.keys[lang]
        let keys = [
            [ keyStrings.nearest ],
            [ keyStrings.addresses],
            [ keyStrings.prices ],
            [ keyStrings.metal_list ],
            [ keyStrings.contact ],
            [ keyStrings.request_call ],
            [ keyStrings.back_to_main ]
        ]
        return keys
    },
    //клавиатура запроса локации
    requestLocation:lang=>{
        let keyStrings = Strings.battery.keys[lang]
        let keys = [
            [ Markup.locationRequestButton(keyStrings.send_location) ],
            [ Markup.button(keyStrings.back) ],
        ]
        return keys
    },
    //запрос контакта
    requestContact:lang=>{
        let keyStrings = Strings.battery.keys[lang]
        let keys = [
            [ Markup.contactRequestButton(keyStrings.send_contact) ],
            [ Markup.button(keyStrings.back) ],
        ]
        return keys
    },
    //услуги
    serviceKeyboard:lang=>{
        let keyStrings = Strings.service.keys[lang]
        let keys = [
            keyStrings.destruction,
            keyStrings.analysis,
            Strings.common[lang].back_to_main
        ]
        return keys
    },
    //уничтожение
    serviceDestrKeyboard:lang=>{
        let keyStrings = Strings.service.keys[lang]

        let keys = [
            keyStrings.contact,
            Markup.contactRequestButton(keyStrings.request_call),
            Strings.common[lang].back
        ]

        return keys
    },
    //анализ
    serviceAnalysisKeyboard: lang=>{
        let keyStrings = Strings.service.keys[lang]

        let keys = [
            keyStrings.contract,
            keyStrings.contact,
            Markup.contactRequestButton(keyStrings.request_call),
            Strings.common[lang].back
        ]

        return keys
    },
    //жалоба
    complainKeyboard: lang=>{
        let keyStrings = Strings.complain.keys[lang]

        let keys = [
            keyStrings.anonymous,
            Markup.contactRequestButton(keyStrings.send_contact),
            Strings.common[lang].back_to_main
        ]

        return keys
    },
    //контакты
    contactsKeyboard:(contacts,perPage,page,lang)=>{

        let currContacts = contacts//contacts.slice( (page-1)*perPage, page*perPage )
        if(currContacts.length===0)return false

        let keys = []

        for(let i = 0 ; i < currContacts.length ; i++){
            if(currContacts[i+1] !== undefined )
                keys.push([currContacts[i].title,currContacts[i+1].title])
            else
                keys.push([currContacts[i].title])

            i++
        }

        /*if(contacts.length > perPage*page){
            keys.push([Strings.common[lang].show_more])
        }*/

        //keys.push([Strings.common[lang].show_on_map])

        keys.push([Strings.common[lang].back_to_main])

        /*else{
            keys.push([Strings.common[lang].back , Strings.common[lang].back_to_main])
        }*/




        return keys


    },
    //список документов
    documentKeyboard:(buttons,lang)=>{

        let res = []

        for(let i in buttons){
            if(buttons[i].text !== undefined)
            res.push([buttons[i].text])
            else{
                let midRes = []
                for(let j in buttons[i]){
                    midRes.push(buttons[i][j].text)
                }
                res.push(midRes)
            }
        }

        res.push([Strings.common[lang].back_to_main])

        console.log(res)

        return res
    }
}