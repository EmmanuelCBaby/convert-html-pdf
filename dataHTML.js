let Handlebars = require('handlebars');
let fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

const makeHTML = async (htmlTemplate, data) => {
    const html = await readFile(htmlTemplate, 'utf-8')
    let template = Handlebars.compile(html);
    let result = template(data);
    return result;
}

module.exports = makeHTML