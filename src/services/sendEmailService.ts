const fs = require("fs");
const nodemailer = require('nodemailer');

const html = fs.readFileSync('./index.html', 'utf-8');

export default async function SendEmailMessageService() {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gabfon.me',
    port: 465,
    secure: true,
    auth: {
      user: 'hello@gabfon.me',
      pass: 'zd@@qGG!n5frRRhs3!n'
    }
  });

  let mailOptions = {
    from: 'hello@gabfon.me',
    to: 'jg.fonseca@outlook.pt',
    subject: 'Test Email',
    html: html,
  };

  let info = await transporter.sendMail(mailOptions);
  console.log('Message sent: %s', info.messageId);
};