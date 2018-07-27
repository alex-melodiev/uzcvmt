const request = require('request-promise')
const siteUrl = 'http://188.120.254.133:1337'

//запросы к админке, разделены по разным сущностям

module.exports = {
    //урл админки для использования вне этого файла
    siteUrl:siteUrl,
    //новости
    news:{
        getNew:async ()=>{
            //выполняем запрос
            let res =  request({
                method:'GET',
                uri:siteUrl+'/news?was_sent=0',
                json:true
            })
                .catch((e)=>{
                return []
            })
            //возвращаем результат
            return await res
        },
        update:(id,body)=>{
            let options = {
                method: 'PUT',
                uri: siteUrl+'/news/'+id,
                body:body,
                json:true
            }

            request.put(options)
                .then(function (response) {
                })
                .catch(function (err) {
                    // Delete failed...
                })
        }
    },
    //контакты
    contact:{
        get:async lang=>{
            let res =  request({
                method:'GET',
                uri:siteUrl+'/contact?lang='+lang,
                json:true
            })
                .catch((e)=>{
                return []
            })

            return await res
        },
        getByTitle:async (title)=>{
            let res =  request({
                method:'GET',
                uri:siteUrl+'/contact?title='+title,
                json:true
            })
                .catch((e)=>{
                return []
            })

            return await res
        }
    },
    //пользователи
    user:{
        create: async user=>{
            let res =  request({
                method:'POST',
                uri:siteUrl+'/botUser',
                json:true,
                body:user
            })
                .catch((e)=>{
                return []
            })

            return await res
        },
        get: async chatId=>{
            let res =  request({
                method:'GET',
                uri:siteUrl+'/botUser?chatID='+chatId,
                json:true
            })
                .catch((e)=>{
                return []
            })
            return await res
        },
        getAll: async ()=>{
            let res =  request({
                method:'GET',
                uri:siteUrl+'/botUser',
                json:true
            })
                .catch((e)=>{
                return []
            })
            return await res
        },
        deleteOne: async id=>{
            var options = {
                method: 'DELETE',
                uri: siteUrl+'/botUser/'+id,
                resolveWithFullResponse: true    //  <---  <---  <---  <---
            }

            request(options)
                .then(function (response) {
                })
                .catch(function (err) {
                    // Delete failed...
                })
        },
        update: (id,body)=>{

            let options = {
                method: 'PUT',
                uri: siteUrl+'/botUser/'+id,
                body:body,
                json:true
            }

            request.put(options)
                .then(function (response) {
                })
                .catch(function (err) {
                    // Delete failed...
                })

        }
    },
    //отделения
    department:{
        get: async lang=>{
            let res =  request({
                method:'GET',
                uri:siteUrl+'/department?language='+lang,
                json:true
            })
                .catch((e)=>{
                return []
            })
            return await res
        },
        getByDistrict:async distr=>{
            const departments = await request({
                method:'GET',
                uri:siteUrl+'/department?district='+distr,
                json:true
            })
                .catch(e=>{
                    console.log(e)
                    return []
                })
            return await departments
        },
        getById:async distr=>{
            const departments = request({
                method:'GET',
                uri:siteUrl+'/department/'+distr,
                json:true
            })
            console.log(siteUrl+'/department/'+distr)
            return await departments
        }
    },
    //запросы обратного звонка
    inquiry:{
        create:async inquiry=>{
            await request({
                method:'POST',
                uri:siteUrl+'/inquiry',
                json:true,
                body:inquiry
            })
        }
    },
    //текстовые данные и клавиши
    data:{
        get:async title=>{
            let res = await request({
                method:"GET",
                uri:siteUrl+'/data?title='+title,
                json:true
            })
                .catch(e=>{
                    console.log(e)
                    return []
                })

            return res
        }
    },
    //жалобы
    complaint:{
        create:async complaint=>{
            let res = await request({
                method:'POST',
                uri:siteUrl+'/complaint',
                json:true,
                body:complaint
            })
                .catch(e=>{
                    console.log(e)
                    return []
                })

            return res
        }
    },
    //области
    district:{
        get:async lang => {

            let res = await request({
                method:"GET",
                uri:siteUrl+'/district?_sort=created_at:asc&language='+lang,
                json:true
            })
                .catch(e=>{
                    console.log(e)
                    return []
                })

            return res
        }
    }
}