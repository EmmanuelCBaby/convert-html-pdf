let fs = require('fs');
// let pdf = require('html-pdf');
let wkhtmltopdf = require('wkhtmltopdf');
const util = require('util');

const readFile = util.promisify(fs.readFile);

const createPdf = (data, options) => {
    return new Promise((resolve, reject) => {
        wkhtmltopdf(data, options, function (err, result) {
            if (err) return reject(err);
            resolve(result);
        });
    })
}

const makePDF = async (htmlFile, options) => {
    const data = await readFile(htmlFile, 'utf8')
    return createPdf(data, options)
}

module.exports = makePDF