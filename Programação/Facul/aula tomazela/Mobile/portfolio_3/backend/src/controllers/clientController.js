const db = require('../config/database');

exports.getAll = async (req, res, next) => {
  try {
    const clients = await db('clients')
      .select('id', 'name', 'email', 'phone', 'cpf', 'address', 'active', 'created_at', 'updated_at')
      .where({ active: 1 })
      .orderBy('name', 'asc');

    return res.json(clients);
  } catch (error) {
    return next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const client = await db('clients')
      .select('id', 'name', 'email', 'phone', 'cpf', 'address', 'active', 'created_at', 'updated_at')
      .where({ id })
      .first();

    if (!client) {
      return res.status(404).json({ error: 'Cliente nao encontrado' });
    }

    return res.json(client);
  } catch (error) {
    return next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { name, email, phone, cpf, address } = req.body;
    const cleanCpf = cpf && cpf.trim() ? cpf.trim() : null;

    if (cleanCpf) {
      const cpfExists = await db('clients').where({ cpf: cleanCpf }).first();
      if (cpfExists) {
        return res.status(409).json({ error: 'CPF ja cadastrado' });
      }
    }

    const [id] = await db('clients').insert({
      name,
      email: email || null,
      phone: phone || null,
      cpf: cleanCpf,
      address: address || null,
      active: 1,
    });

    return res.status(201).json({ id, name });
  } catch (error) {
    return next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { name, email, phone, address } = req.body;

    const client = await db('clients').where({ id }).first();
    if (!client) {
      return res.status(404).json({ error: 'Cliente nao encontrado' });
    }

    await db('clients').where({ id }).update({
      name,
      email: email || null,
      phone: phone || null,
      address: address || null,
    });

    return res.json({ message: 'Atualizado' });
  } catch (error) {
    return next(error);
  }
};

exports.toggle = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const client = await db('clients').select('active').where({ id }).first();
    if (!client) {
      return res.status(404).json({ error: 'Cliente nao encontrado' });
    }

    const active = client.active ? 0 : 1;
    await db('clients').where({ id }).update({ active });

    return res.json({ active });
  } catch (error) {
    return next(error);
  }
};
