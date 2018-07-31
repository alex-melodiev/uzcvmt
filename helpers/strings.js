//Строки и их переводы


//Используемые во многих местах
const commonStrings = {
    ru: {
        show_more:"Показать больше ➡️ ",
        back:"⬅️ Назад",
        back_to_main:"⬅️ В главное меню",
        show_on_map:"Показать на карте",
        title:"Узвторцветмет",
        sales:"Отдел продаж",
        hr:"Отдел кадров"
    },
    uz: {
        show_more:"Кўпроқ кўрсатиш ➡️ ",
        back:"⬅️ Орқага",
        back_to_main:"⬅️ Асосий менюга",
        show_on_map:"Харитада кўрсатиш",
        title:"Ўзиккиламчиранглиметалл",
        sales:"Савдо бўлими",
        hr:"Кадрлар бўлими"
    }
}


//Строки по разделам бота
module.exports = {
    common:commonStrings,
    hello:{
        helloMessage:{
            ru:"Добро пожаловать в электронный офис АО \"Узвторцветмет\"",
            uz:"\"Ўзиккиламчиранглиметалл\" АЖ нинг электрон ваколатхонасига хуш келибсиз",
            changelang_ru:"Выберите язык",
            changelang_uz:"Тилни тангланг"
        }
    },
    main:{
        mainKeyboard:{
            ru:{
                message:'Выберите категорию',
                give_battery:"🔋 Сдать аккумулятор",
                give_metal:"🔧 Сдать цветной металл",
                products:"📄 Каталог товаров",
                service:"⚙️ Услуги",
                prices:"💲 Цены",
                documentation:"📄 Нормативно-правовые документы",
                vacancies:"👨🏻‍💼 Вакансии",
                contacts:"📞 Контакты",
                complain:"❗️Подать обращение",
                requisites:"🏢 ️Реквизиты",
                language:"Выбрать язык"
            },
            uz:{
                message:'Категорияни танланг',
                give_battery:"🔋 Аккумуляторни топшириш",
                give_metal:"🔧 Рангли металлни топшириш",
                products:"📄 Маҳсулотлар рўйхати",
                service:"⚙️ Хизматлар",
                prices:"💲 Нархлар",
                documentation:"📄 Норматив-ҳуқуқий ҳужжатлар",
                vacancies:"👨🏻‍💼 Бўш иш ўринлари",
                contacts:"📞 Алоқалар",
                complain:"❗️Шикоят қилиш",
                requisites:"🏢 ️Реквизитлар",
                language:"Тилни танлаш"
            }
        },
    },
    battery:{
        messages:{
            ru:{
                hello:"Средняя цена за 1 сданный аккумулятор составляет 25 000 сум",
                req_location:"Отправьте Вашу локацию",
                send_contact:"Отправьте Ваш контакт",
                contact_person:"Контактное лицо",
                nearest_dep:"Ближайший пункт",
                way:"Расстояние",
                km:"км",
                inquiry_saved:"В ближайшее время с Вами свяжется компетентный сотрудник АО «Узвторцветмет». Ожидайте звонка.",
                cont_name:'Call-center'
            },
            uz:{
                hello:"1 та топширилган аккумулятор учун ўртача нарх 25 000 сўм",
                req_location:"Жойлашувингизни юборинг",
                contact_person:"Алоқа учун шахс",
                send_contact:"Алоқа учун рақамни юбориш",
                nearest_dep:"Энг яқин пункт",
                way:"Масофа",
                km:"км",
                inquiry_saved:"Раҳмат, сизнинг аризангиз сақланди.",
                cont_name:'Call-center'
            }
        },
        keys:{
            ru:{
                nearest:"Найти ближайший пункт приема",
                addresses:"Адреса приемных пунктов",
                contact:"Связаться со специалистом",
                request_call:"Заказать звонок",
                send_location:"Отправить локацию",
                send_contact:"Отправить контакт",
                back: commonStrings.ru.back,
                back_to_main: commonStrings.ru.back_to_main
            },
            uz:{
                nearest:"Энг яқин қабул пунктини топиш",
                addresses:"Қабул пунктларининг манзили",
                contact:"Мутахассис билан боғланиш",
                request_call:"Қўнғироқ буюртма қилиш",
                send_location:"Жойлашувни юбориш",
                send_contact:"Алоқа учун рақамни юбориш",
                back: commonStrings.uz.back,
                back_to_main: commonStrings.uz.back_to_main
            }
        }
    },
    metal:{
        messages:{
            ru:{
                hello:"Внимание! АО «Узвторцветмет» принимает любой тип цветного металла от юридических лиц. От физических " +
                "лиц принимается исключительно бытовой лом содержащий цветные металлы. С перечнем бытового лома разрешенный " +
                "сдаче физическим лицам, Вы сможете ознакомиться ниже. Кроме того, АО «Узвторцветмет» предоставляет услугу по " +
                "бесплатному самовывозу лома, для более подробной информации, свяжитесь со специалистом",
                req_location:"Отправьте Вашу локацию",
                send_contact:"Отправьте Ваш контакт",
                contact_person:"Контактное лицо",
                nearest_dep:"Ближайший пункт",
                way:"Расстояние",
                km:"км",
                inquiry_saved:"В ближайшее время с Вами свяжется компетентный сотрудник АО «Узвторцветмет». Ожидайте звонка.",
                cont_name:'Call-center'
            },
            uz:{
                hello:"Эътиборга олинг! «Ўзиккиламчиранглиметалл»  АЖ юридик шахслардан рангли металлга тегишли бўлган ҳар қандай " +
                "металлни қабул қилади. Жисмоний шахслардан эса фақатгина таркибида рангли металл бўлган маиший парчалар " +
                "қабул қилинади. Жисмоний шахслар топшириши мумкин бўлган маиший парчалар рўйхати билан, Сиз қуйида танишишнгиз " +
                "мумкин. Бундан ташқари, «Ўзиккиламчиранглиметалл»  АЖ парчаларни бепул ташиб олиб кетиш хизматини таклиф этади, " +
                "тўлиқроқ маълумот учун, мутахассис билан боғланинг.",
                req_location:"Жойлашувингизни юборинг",
                contact_person:"Алоқа учун шахс",
                send_contact:"Алоқа учун рақамни юбориш",
                nearest_dep:"Энг яқин пункт",
                way:"Масофа",
                km:"км",
                inquiry_saved:"Раҳмат, сизнинг аризангиз сақланди.",
                cont_name:'Call-center'
            }
        },
        keys:{
            ru:{
                nearest:"Найти ближайший пункт приема",
                addresses:"Адреса приемных пунктов",
                contact:"Связаться со специалистом",
                request_call:"Заказать звонок",
                send_location:"Отправить локацию",
                send_contact:"Отправить контакт",
                prices:"Закупочные цены на цветные металлы",
                metal_list:"Перечень бытового лома разрешенный сдаче физ.лицам",
                back: commonStrings.ru.back,
                back_to_main: commonStrings.ru.back_to_main
            },
            uz:{
                nearest:"Энг яқин қабул пунктини топиш",
                addresses:"Қабул пунктларининг манзили",
                contact:"Мутахассис билан боғланиш",
                request_call:"Қўнғироқ буюртма қилиш",
                send_location:"Жойлашувни юбориш",
                send_contact:"Алоқа учун рақамни юбориш",
                prices:"Рангли металларни сотиб олинадиган нархлари",
                metal_list:"Жисмоний шахслардан қабул қилишга рухсат этилган маиший металл парчалари рўйхати",
                back: commonStrings.uz.back,
                back_to_main: commonStrings.uz.back_to_main
            }
        }
    },
    service:{
        messages:{
            ru:{
                hello:"Выберите услугу:",
                destruction:"АО «Узвторцветмет» предоставляет юридическим лицам услуги по уничтожению невостребованных материалов, оборудования, бумаг и т.д. Уничтожение производиться четырьмя способами (По необходимости совмещается):"+
				"\n- Сжигание в газовой печи;"+
				"\n- Резка механическими ножницами;"+
                "\n- Ручна резка;"+
                "\n- Пресование."+
                "\nДля справки:"+
                "\n1. На уничтожение принимаются предметы, не являющиеся взрывоопасными, химическими, наркотическими либо вредными для окружающей среды."+
                "\n2. Стоимость уничтожения тех или иных предметов зависит от протяжении работы печи. Предварительную стоимость услуги Вы сможете узнать связавшись с нашими специалистами."+
                "\n3. Вход наблюдателей на территорию предприятия осуществляется только при наличии документа удостоверяющий личность."+
                "\n4. После прохождения всех этапов уничтожения, Вы получите акт уничтожения подписанным АО «Узвторцветмет»."+
                "\nДля того, чтобы воспользоваться данной услугой, необходимо связаться с ответственным специалистом.",
                analysis:"Лаборатория АО 'Узвторцветмет' предлагает услуги по спектральному высокоточному анализу лома и сплавов цветных металлов, изделий из металлов в соответствии с мировыми стандартами и ГОСТами РУз. Анализ осуществаляется на основе образцов алюминевой, свинцовой, медной, цинковой и железной основе. Стоимость осуществления анализа за один образец составляет 300 000 сум.",
                enter_number: "Введите количество образцов для испытаний:",
                incorrect_number: "Введите количество образцов для испытаний",
                contract: "Скачайте контракт, заполните недостающие поля и отправьте его в АО 'Узвторцветмет'",
                cont_an_name:"Лаборатория",
                cont_destr_name:"Отдел продаж"
            },
            uz:{
                hello:"Хизматни тангланг",
                destruction:"«Ўзиккиламчиранглиметалл» АЖ юридик шахсларга кераксиз материал, ускуна, қоғоз ва ҳоказоларни йўқ қилиш бўйича ҳизматлар кўрсатади. Йўқ қилиш 4 ҳил усулда амалга оширилади (керак бўлганда, ҳаммаси амалга оширилади):"+
				"\n- Газ ўчоқларида ёқиш;"+
				"\n- Механик қайчи билан кесиш;"+
                "\n- Дастаки кесиш;"+
                "\n- Пресслаш."+
                "\nМаълумот учун:"+
                "\n1. Йўқ қилиш учун қуйидаги жисмлар қабул қилинади: портловчи, кимёвий, гиёҳванд ва атроф-муҳит учун зарарли бўлмаган."+
                "\n2. Йўқ қилиш қиймати ўчоқнинг ишлаш давомийлигига боғлиқ. Сиз ҳизматларнинг дастлабки қийматини бизнинг мутахасиссларимиз билан боғланган ҳолда аниқлаб олишингиз мумкин."+
                "\n3. Корхона ҳудудига кузатувчиларнинг кириши фақат шахсни тасдиқловчи ҳужжат орқали амалга оширилади."+
                "\n4. Йўқ қилишнинг барча босқичлари амалга оширилгандан сўнг, Сиз “Ўзиккиламчиранглиметалл” АЖ томонидан имзоланган далолатнома қабул қиласиз."+
                "\nУшбу хизматлардан фойдаланиш учун, масъул мутахассислар билан боғланишингиз керак.",
                analysis:"«Ўзиккиламчиранглиметалл» АЖ лабораторияси жаҳон стандартлари ва O’zDST ларига мувофиқ равишда, рангли металл парчалари ва қотишмалари, металл буюмларнинг, юқори аниқликдаги спектралли таҳлиллар бўйича ҳизматларни таклиф этади. Таҳлил алюминий, қўрғошин, мис, рух ва темир намуналари асосида амалга оширилади. Бир намуна таҳлилининг нархи (ҚҚС билан) 300 000 сўмни ташкил этади.",
                enter_number: "Синов намуналарини сонини киритинг:",
                incorrect_number: "Синов намуналарини сонини киритинг",
                contract: "Шартномани юклаб олинг, маълумотларни тўлиқ тўлдиринг ва уни «Ўзиккиламчиранглиметалл» АЖ га юборинг.",
                cont_an_name:"Лаборатория",
                cont_destr_name:"Савдо бўлими"
            }
        },
        keys:{
            ru:{
                destruction:"Уничтожение",
                analysis:"Спектральный анализ",
                contact:"Связаться со специалистом",
                contract:"Заключить контракт",
                request_call:"Заказать звонок"
            },
            uz:{
                destruction:"Йўқ қилиш",
                analysis:"Спектралли таҳлил",
                contact:"Мутахассис билан боғланиш",
                contract:"Шартнома тузиш",
                request_call:"Қўнғироқ буюртма қилиш"
            }
        }
    },
    complain:{
        messages:{
            ru:{
                hello:"Пожалуйста, выберите способ подачи обращения",
                insert_text:"Опишите, на что Вы жалуетесь",
                message_receipt:"Спасибо за Ваше обращение, мы обещаем принять во внимание Вашу жалобу и в ближайшее время устранить недостаток компании."
            },
            uz:{
                hello:"Мурожаат юбориш турини тангланг",
                insert_text:"Нима ҳақида шикоят қилаётганизни тушунтиринг",
                message_receipt:"Мурожаатингиз учун раҳмат, Сизнинг шикоятингизни инобатга оламиз ва тез орада корхона томонидан юзага келган камчиликни бартараф этишга ҳаракат қиламиз."
            }
        },
        keys:{
            ru:{
                anonymous:"Анонимно",
                send_contact:"Представиться"
            },
            uz:{
                anonymous:"Аноним",
                send_contact:"Ўзингизни таништиринг"
            }
        }
    },
    district:{
        messages:{
            ru:{
                select_distr:"Выберите область",
                incorrect_distr:"Пожалуйста, выберите область"
            },
            uz:{
                select_distr:"Вилоятни танланг",
                incorrect_distr:"Илтимос, вилоятни тангланг"
            }
        }
    }
}