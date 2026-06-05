const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('../config/database');

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha sao obrigatorios' });
    }

    const user = await db('users').where({ email }).first();

    if (!user || !user.active) {
      return res.status(401).json({ error: 'Credenciais invalidas' });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({ error: 'Credenciais invalidas' });
    }

    const payload = { id: user.id, name: user.name, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    });

    return res.json({
      token,
      user: payload,
    });
  } catch (error) {
    return next(error);
  }
};
