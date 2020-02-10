const nodeoutlook = require('nodejs-nodemailer-outlook')
const emailid = 'westagilelabs@cypresslawn.com'
const emailpwd = 'Dev4cypress!'

const sendMail = (to, subject, text, attachment, attachmentName) => {
    nodeoutlook.sendEmail({
        auth: {
            user: emailid,
            pass: emailpwd
        },
        from: '*',
        to: to,
        subject: subject,
        text: text,
        attachments: [{
            filename: attachmentName,
            content: attachment
        }],
        onError: (error) => console.log(error),
        onSuccess: (success) => console.log(success)
    })
}

module.exports = sendMail
