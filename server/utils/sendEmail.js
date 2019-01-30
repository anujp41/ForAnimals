const uuidv1 = require('uuid/v1');
const {
  genPWEmailTemplate,
  genAccessEmailTemplate,
  genPermissionEmailTemplate,
  genDenyEmailTemplate
} = require('./genEmailTemplate');
const { transporter } = require('./emailUtils');

const sendPWEmail = (emailAddress, firstName) =>
  new Promise((resolve, reject) => {
    const resetToken = uuidv1();
    const emailBody = genPWEmailTemplate(firstName, resetToken);

    const mailOptions = {
      from: 'foranimalsdb@gmail.com',
      to: emailAddress,
      subject: 'Change your password to For Animals website',
      html: emailBody
    };

    transporter.sendMail(mailOptions, (error, info) => {
      console.log('informazione ', info);
      if (error) reject(error);
      resolve({ resetToken, messageID: info.messageId, email: emailAddress });
    });
  });

const sendAccessEmail = (id, email, firstName, lastName) =>
  new Promise((resolve, reject) => {
    const emailBody = genAccessEmailTemplate(id, email, firstName, lastName);
    const mailOptions = {
      from: 'foranimalsdb@gmail.com',
      to: 'foranimalsdb@gmail.com',
      subject: `${firstName} has requested access`,
      html: emailBody
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) reject(error);
      resolve(email);
    });
  });

const sendPermissionEmail = (email, firstName) =>
  new Promise((resolve, reject) => {
    const emailBody = genPermissionEmailTemplate(email, firstName);
    const mailOptions = {
      from: 'foranimalsdb@gmail.com',
      to: `${email}`,
      subject: `Access to For Animals database for ${firstName}`,
      html: emailBody
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) reject(error);
      resolve(email);
    });
  });

const sendDenyEmail = (email, firstName) =>
  new Promise((resolve, reject) => {
    const emailBody = genDenyEmailTemplate(email, firstName);
    const mailOptions = {
      from: 'foranimalsdb@gmail.com',
      to: `${email}`,
      subject: `Access Denied to For Animals database`,
      html: emailBody
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) reject(error);
      resolve(email);
    });
  });

module.exports = {
  sendPWEmail,
  sendAccessEmail,
  sendPermissionEmail,
  sendDenyEmail
};
