const bcrypt = require('bcryptjs');

const db = require('../config/database');

exports.getAll = async (req, res, next) => {
  try {
    const users = await db('users')
      .select('id', 'name', 'email', 'active', 'created_at', 'updated_at')
      .where({ active: 1 })
      .orderBy('name', 'asc');

    return res.json(users);
  } catch (error) {
    return next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const user = await db('users')
      .select('id', 'name', 'email', 'active', 'created_at', 'updated_at')
      .where({ id })
      .first();

    if (!user) {
      return res.status(404).json({ error: 'Usuario nao encontrado' });
    }

    return res.json(user);
  } catch (error) {
    return next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const exists = await db('users').where({ email }).first();
    if (exists) {
      return res.status(409).json({ error: 'Email ja cadastrado' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const [id] = await db('users').insert({
      name,
      email,
      password: passwordHash,
      active: 1,
    });

    return res.status(201).json({ id, name, email });
  } catch (error) {
    return next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { name, email } = req.body;

    const user = await db('users').where({ id }).first();
    if (!user) {
      return res.status(404).json({ error: 'Usuario nao encontrado' });
    }

    if (email) {
      const emailExists = await db('users').where({ email }).whereNot({ id }).first();
      if (emailExists) {
        return res.status(409).json({ error: 'Email ja cadastrado' });
      }
    }

    await db('users').where({ id }).update({ name, email });

    return res.json({ message: 'Atualizado' });
  } catch (error) {
    return next(error);
  }
};

exports.toggle = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const user = await db('users').select('active').where({ id }).first();
    if (!user) {
      return res.status(404).json({ error: 'Usuario nao encontrado' });
    }

    const active = user.active ? 0 : 1;
    await db('users').where({ id }).update({ active });

    return res.json({ active });
  } catch (error) {
    return next(error);
  }
};
