const mailgun = require('mailgun-js')

function sendMail(req, res) {
    const name = req.body.name;
    const from = req.body.from;
    const message = req.body.message;
    const to = process.env.MY_ADDRESS;

    const api_key = process.env.MAIL_API_KEY

    const DOMAIN = process.env.MAIL_BASE_URL;
    const mg = mailgun({apiKey: api_key, domain: DOMAIN});
    const data = {
        from: from,
        to: to,
        subject: name + ' cherche le contact',
        text: message
    };
    mg.messages().send(data, function (error, body) {
        if (!error) {
        res.json({success: true, msg: 'Thank you, your message was succesfully sent', body})
        console.log(body)
        return true;
        }
        res.json({success: false, msg: 'Something went wrong when sending the message, please try again later', error, body})
        console.log(error)
    });
}

module.exports = sendMail