const { mailGenerator } = require('./emailUtils');

const genPWEmailTemplate = (firstName, resetToken) => {
  const pwEmail = {
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
  const emailBody = mailGenerator.generate(pwEmail);
  return emailBody;
}

const genAccessEmailTemplate = (id, email, firstName, lastName) => {
  const accessEmail = {
    body: {
      name: 'For Animals Administrator',
      intro: [`${firstName} ${lastName} (${email}) has requested access to the For Animals database website.`, `If you recongnize ${firstName}, please click the GREEN button below to grant access. If you do not recognize him/her, please click the grey button to deny access!`],
      action: [{
        instructions: 'To grant access, please click here:',
        button: {
          color: '#22BC66',
          text: 'Click to grant access',
          link: `${process.env.PROCESS_URL}api/auth/userAccess/${id}?=true`
        }
      }, {
        instructions: `If you do not recognize ${firstName}, click button below:`,
        button: {
          color: '#485148',
          text: 'Click to deny access',
          link: `${process.env.PROCESS_URL}api/auth/userAccess/${id}?=false`
        }
      }]
    },
    outro: 'Thank you for your prompt action!'
  };
  const emailBody = mailGenerator.generate(accessEmail);
  return emailBody;
};

module.exports = { genPWEmailTemplate, genAccessEmailTemplate };