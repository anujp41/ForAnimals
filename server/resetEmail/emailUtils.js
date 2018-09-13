const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

const mailGenerator = new Mailgen({
  theme: 'salted',
  product: {
    name: 'For Animals',
    link: 'https://for-animals.herokuapp.com/',
    logo: 'https://firebasestorage.googleapis.com/v0/b/foranimalsinc-2b9a6.appspot.com/o/website_assets%2Flogo.png?alt=media&token=c82d6008-4190-4651-80e0-b271c509e467'
  }
})

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'foranimalsdb@gmail.com',
    pass: process.env.GMAIL_PW
  }
});

module.exports = { mailGenerator, transporter };