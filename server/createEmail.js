const Mailgen = require('mailgen');
const nodemailer = require('nodemailer');

const mailGenerator = new Mailgen({
  theme: 'salted',
  product: {
    name: 'For Animals',
    link: 'https://for-animals.herokuapp.com/',
    logo: 'https://firebasestorage.googleapis.com/v0/b/foranimalsinc-2b9a6.appspot.com/o/website_assets%2Flogo.png?alt=media&token=c82d6008-4190-4651-80e0-b271c509e467'
  }
})

const email = {
  body: {
      name: 'For Animals Volunteer',
      intro: 'Thank you for continuing to volunteer with For Animals. We are grateful to have you onboard with us.',
      action: {
          instructions: 'To reset your password, please click here:',
          button: {
              color: '#22BC66', // Optional action button color
              text: 'Reset password',
              link: `${process.env.PROCESS_URL}resetpassword`
          }
      },
      outro: 'If you have any question, please reply to this email!'
  }
};

// Generate an HTML email with the provided contents
const emailBody = mailGenerator.generate(email);
const emailText = mailGenerator.generatePlaintext(email);

const createEmail = emailAddress => {
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'foranimalsdb@gmail.com',
      pass: process.env.GMAIL_PW
    }
  });

  const mailOptions = {
    from: 'foranimalsdb@gmail.com',
    to: emailAddress,
    subject: 'Change your password to For Animals website',
    text: emailText,
    html: emailBody
  }

  console.log('sending email to ', emailAddress)

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return console.log(error);
    console.log('Message sent: %s', info.messageId);
  });
}

module.exports = createEmail;