const makeHTML = require('./dataHTML')
const sendMail = require('./sendEmail')
const wkhtmltopdf = require('wkhtmltopdf');
const path = require('path');

let htmlTemplate = path.resolve(__dirname, './paymentPrintTemplate.html');
let cypressLogo = path.resolve(__dirname, "./cl-logo.png")
let visaLogo = path.resolve(__dirname, "./visa.png")
let options = { pageSize: 'A4' };
let pdfName = 'Receipt.pdf';

(async () => {
    try {
        let data = {
            "title": "1370 El Camino Real • Colma, CA 94014 • (650) 755-0580",
            "date": "02/06/2020",
            "receiptNumber": "Test Receipt Number",
            "purchasers": "Hashirama Senju, Tobirama Senju, Sarutobi Hiruzen, Minato Namikaze",
            "d1Name": "Hashirama Senju",
            "d1Number": "FA9JF48JF98",
            "paymentPerson": "Madara Uchiha",
            "endingWith": "XX4584",
            "bank": "Bank of Konoha",
            "amount": "9600",
            "transactionNumber": "KFA428GJN",
            "paymentReceipt": "KFA428GJN",
            "clLogo": cypressLogo,
            "Visa": visaLogo
        };

        //TODO: Purchasers can be an array
        //TODO: Decedents can be an array

        let renderedHtml = await makeHTML(htmlTemplate, data)
        let pdfStream = wkhtmltopdf(renderedHtml, options)
        sendMail('emmanuel.b@westagilelabs.com', 'Payment Receipt', 'Receipt', pdfStream, pdfName)
    } catch (error) {
        console.error(error)
    }
})()
