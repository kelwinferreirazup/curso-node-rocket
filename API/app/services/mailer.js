const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'dd409c9dcc3eb9',
    pass: 'f24f735971de16',
  },
});

module.exports = (options) => {
  transport.sendMail(options);
};
