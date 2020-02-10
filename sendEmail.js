const nodeoutlook = require('nodejs-nodemailer-outlook')
const emailid = 'westagilelabs@cypresslawn.com'
const emailpwd = 'Dev4cypress!'

const sendMail = async (to, subject, text, attachment) => {
    return new Promise((resolve, reject) => {
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
                path: attachment
            }],
            onError: (error) => reject(error),
            onSuccess: (success) => resolve(success)
        })
    })
}

module.exports = sendMail
