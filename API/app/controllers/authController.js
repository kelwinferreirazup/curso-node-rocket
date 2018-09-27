const mongoose = require('mongoose');
const sendMail = require('../services/mailer');

const User = mongoose.model('User');

module.exports = {
  async signin(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      if (!await user.compareHash(password)) {
        return res.status(400).json({ error: 'Invalid Password' });
      }

      return res.json({
        user,
        token: user.generateToken(),
      });
    } catch (err) {
      return next(err);
    }
  },

  async signup(req, res, next) {
    try {
      const { email, username } = req.body;
      if (await User.findOne({ $or: [{ username }, { email }] })) {
        return res.status(400).json({ error: 'User already exitst' });
      }
      const user = await User.create(req.body);

      await sendMail({
        from: 'Kelwin Henrique <kelwin.ferreira@zup.com.br>',
        to: user.email,
        subject: 'Bem vindo ao meu Twitter',
        html: 'Olá, seja bem vindo',
      });

      return res.json({
        user,
        token: user.generateToken(),
      });
    } catch (err) {
      return next(err);
    }
  },
};
