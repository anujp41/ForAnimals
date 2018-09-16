const uuidv1 = require('uuid/v1');
const { genPWEmailTemplate, genAccessEmailTemplate } = require('./genEmailTemplate');
const { transporter } = require('./emailUtils');

const sendPWEmail = (emailAddress, firstName) => new Promise((resolve, reject) => {
  const resetToken = uuidv1();
  const emailBody = genPWEmailTemplate(firstName, resetToken);

  const mailOptions = {
    from: 'foranimalsdb@gmail.com',
    to: emailAddress,
    subject: 'Change your password to For Animals website',
    html: emailBody
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) reject(error);
    resolve({resetToken, messageID: info.messageId, email: emailAddress});
  });
})

const sendAccessEmail = (id, email, firstName, lastName) => new Promise((resolve, reject) => {
  const emailBody = genAccessEmailTemplate(id, email, firstName, lastName);
  const mailOptions = {
    from: 'foranimalsdb@gmail.com',
    to: 'foranimalsdb@gmail.com',
    subject: `${firstName} is request access`,
    html: emailBody
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) reject(error);
    resolve(email);
  });
})

module.exports = { sendPWEmail, sendAccessEmail };