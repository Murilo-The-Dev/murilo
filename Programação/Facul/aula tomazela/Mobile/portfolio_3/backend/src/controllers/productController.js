const db = require('../config/database');

exports.getAll = async (req, res, next) => {
  try {
    const products = await db('products')
      .select('id', 'name', 'description', 'price', 'stock', 'active', 'created_at', 'updated_at')
      .where({ active: 1 })
      .orderBy('name', 'asc');

    return res.json(products);
  } catch (error) {
    return next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const product = await db('products')
      .select('id', 'name', 'description', 'price', 'stock', 'active', 'created_at', 'updated_at')
      .where({ id })
      .first();

    if (!product) {
      return res.status(404).json({ error: 'Produto nao encontrado' });
    }

    return res.json(product);
  } catch (error) {
    return next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { name, description, price, stock } = req.body;

    const [id] = await db('products').insert({
      name,
      description,
      price,
      stock,
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
    const { name, description, price, stock } = req.body;

    const product = await db('products').where({ id }).first();
    if (!product) {
      return res.status(404).json({ error: 'Produto nao encontrado' });
    }

    await db('products').where({ id }).update({ name, description, price, stock });

    return res.json({ message: 'Atualizado' });
  } catch (error) {
    return next(error);
  }
};

exports.toggle = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const product = await db('products').select('active').where({ id }).first();
    if (!product) {
      return res.status(404).json({ error: 'Produto nao encontrado' });
    }

    const active = product.active ? 0 : 1;
    await db('products').where({ id }).update({ active });

    return res.json({ active });
  } catch (error) {
    return next(error);
  }
};
