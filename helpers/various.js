const JSZip = require('jszip')
const Docxtemplater = require('docxtemplater')
const fs = require('fs')
const path = require('path')

//различные функции

module.exports = {
    //перевод в радианы
    toRadians: (angle) => {
        return angle * (Math.PI / 180);
    },
    //проверка массива
    isEmpty: array=> {
        return typeof array !== "undefined" && array !== null && array.length !== null && array.length > 0 ? false : true
    },
    //замена данных в шаблоне договора
    replaceTemplate:(price,singlePrice,count) => {

        //Load the docx file as a binary
        let content = fs
            .readFileSync(path.resolve(__dirname, 'contract.docx'),'binary')

        let zip = new JSZip(content)

        let doc = new Docxtemplater()
        doc.loadZip(zip)

        //set the templateVariables
        doc.setData({
            price: price + ' сум',
            single_price: singlePrice + ' сум',
            count: count
        })

        try {
            // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
            doc.render()
        }
        catch (error) {
            let e = {
                message: error.message,
                name: error.name,
                stack: error.stack,
                properties: error.properties,
            }
            console.log(JSON.stringify({error: e}))
            // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
            throw error;
        }


        let buf = doc.getZip()
            .generate({type: 'nodebuffer'})

        // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
        fs.writeFileSync(path.resolve(__dirname, 'output.docx'), buf)

        return buf
    },
    //проверка на число
    isNumber:(n) => {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
}