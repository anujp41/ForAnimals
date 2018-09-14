const uuidv1 = require('uuid/v1');
const genEmailTemplate = require('./genEmailTemplate');
const { transporter } = require('./emailUtils');

const createEmail = (emailAddress, firstName) => new Promise((resolve, reject) => {
  const resetToken = uuidv1();
  const emailBody = genEmailTemplate(firstName, resetToken);

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

module.exports = createEmail;