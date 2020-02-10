const makeHTML = require('./dataHTML')
const makePDF = require('./htmlPdf')
const sendMail = require('./sendEmail')
let fs = require('fs');
const util = require('util');

const path = require('path');
let pdfName = 'Receipt.pdf';
let htmlTemplate = path.resolve(__dirname, './paymentPrintTemplate.html');
let htmlFile = path.resolve(__dirname, './paymentPrint.html');
let pdfFile = path.resolve(__dirname, `./${pdfName}`)
let cypressLogo = path.resolve(__dirname, "./cl-logo.png")
let visaLogo = path.resolve(__dirname, "./visa.png")
let options = { pageSize: 'A4', output: pdfName  };

const unlink = util.promisify(fs.unlink);

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
        //TODO: Try to make a stream rather than a HTML file
        //TODO: Try to make a stram rather than a PDF file

        await makeHTML(htmlTemplate, data)
        await makePDF(htmlFile, options, `./${pdfName}`)
        await sendMail('emmanuel.b@westagilelabs.com', 'test email', 'Test', pdfFile)
        // await unlink(pdfFile)
    } catch (error) {
        console.log()
    }
})()
