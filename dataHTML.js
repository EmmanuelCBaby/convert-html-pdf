let Handlebars = require('handlebars');
let fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

const createHTML = (html, data) => {
    return new Promise((resolve, reject) => {
        var template = Handlebars.compile(html);
        var result = template(data);
        fs.writeFile('paymentPrint.html', result, function (err, result) {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

const makeHTML = async (htmlTemplate, data) => {
    const html = await readFile(htmlTemplate, 'utf-8')
    return createHTML(html, data)
}

module.exports = makeHTML