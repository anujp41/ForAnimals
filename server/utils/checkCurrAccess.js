const { User } = require('../models');

const checkCurrAccess  = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
  .then(res => res.get())
  .then(user => {
    const {firstName, lastName, email, hasAccess, accessActionDate} = user;
    if (hasAccess === null) {
      Object.assign(res.locals, {firstName, lastName, email});
      return next();
    } else {
      const [year, month, date] = [accessActionDate.getFullYear(), accessActionDate.getMonth()+1, accessActionDate.getDate()];
      if (hasAccess === false) {
        return res.json(`${firstName} ${lastName} (${email}) was previously denied access on ${month}/${date}/${year}.`)
      } else {
        return res.json(`${firstName} ${lastName} (${email}) was previously granted access on ${month}/${date}/${year}.`)
      }
    }
    return next();
  })
}

module.exports = checkCurrAccess;