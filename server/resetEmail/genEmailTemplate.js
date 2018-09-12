// const Mailgen = require('mailgen');
const { mailGenerator } = require('./emailUtils');

const genEmailTemplate = (firstName, resetToken) => {  
  const email = {
    body: {
        name: firstName || 'For Animals Volunteer',
        intro: 'Thank you for continuing to volunteer with For Animals. We are grateful to have you onboard with us.',
        action: {
            instructions: 'To reset your password, please click here:',
            button: {
                color: '#22BC66',
                text: 'Click to reset password',
                link: `${process.env.PROCESS_URL}resetpassword/${resetToken}`
            }
        },
        outro: 'If you have any question, please reply to this email!'
    }
  };
  
  const emailBody = mailGenerator.generate(email);
  return emailBody;
}

module.exports = genEmailTemplate;