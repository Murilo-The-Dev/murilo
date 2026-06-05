const db = require('../config/database');

const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

exports.getAll = async (req, res, next) => {
  try {
    const sales = await db('sales as s')
      .join('clients as c', 'c.id', 's.client_id')
      .select('s.id', 's.client_id', 'c.name as client_name', 's.total', 's.status', 's.created_at')
      .orderBy('s.created_at', 'desc');

    return res.json(sales);
  } catch (error) {
    return next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const sale = await db('sales as s')
      .join('clients as c', 'c.id', 's.client_id')
      .select('s.id', 's.client_id', 'c.name as client_name', 's.total', 's.status', 's.created_at')
      .where('s.id', id)
      .first();

    if (!sale) {
      return res.status(404).json({ error: 'Venda nao encontrada' });
    }

    const items = await db('sale_items as si')
      .join('products as p', 'p.id', 'si.product_id')
      .select(
        'si.product_id',
        'p.name as product_name',
        'si.quantity',
        'si.unit_price',
        'si.subtotal'
      )
      .where('si.sale_id', id);

    return res.json({ ...sale, items });
  } catch (error) {
    return next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { client_id, items } = req.body;

    const result = await db.transaction(async (trx) => {
      const groupedItems = new Map();

      items.forEach((item) => {
        const current = groupedItems.get(item.product_id) || 0;
        groupedItems.set(item.product_id, current + item.quantity);
      });

      const productMap = new Map();
      let total = 0;

      for (const [productId, qty] of groupedItems.entries()) {
        const product = await trx('products')
          .select('id', 'name', 'price', 'stock')
          .where({ id: productId, active: 1 })
          .first();

        if (!product) {
          const err = new Error(`Produto nao encontrado: ${productId}`);
          err.statusCode = 404;
          throw err;
        }

        if (product.stock < qty) {
          const err = new Error(`Estoque insuficiente: ${product.name}`);
          err.statusCode = 422;
          throw err;
        }

        productMap.set(productId, product);
      }

      items.forEach((item) => {
        const product = productMap.get(item.product_id);
        total += Number(product.price) * item.quantity;
      });

      total = Number(total.toFixed(2));

      const [saleId] = await trx('sales').insert({
        client_id,
        user_id: req.user.id,
        total,
        status: 'pending',
      });

      for (const item of items) {
        const product = productMap.get(item.product_id);

        await trx('sale_items').insert({
          sale_id: saleId,
          product_id: item.product_id,
          quantity: item.quantity,
          unit_price: product.price,
        });
      }

      for (const [productId, qty] of groupedItems.entries()) {
        await trx('products').where({ id: productId }).decrement('stock', qty);
      }

      const dueDate = addDays(new Date(), 30).toISOString().slice(0, 10);

      await trx('receivables').insert({
        sale_id: saleId,
        client_id,
        amount: total,
        due_date: dueDate,
        status: 'open',
      });

      return { id: saleId, total };
    });

    return res.status(201).json(result);
  } catch (error) {
    return next(error);
  }
};

exports.cancel = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    await db.transaction(async (trx) => {
      const sale = await trx('sales').where({ id }).first();

      if (!sale) {
        const err = new Error('Venda nao encontrada');
        err.statusCode = 404;
        throw err;
      }

      if (sale.status !== 'pending') {
        const err = new Error('Apenas vendas pendentes podem ser canceladas');
        err.statusCode = 422;
        throw err;
      }

      const items = await trx('sale_items').select('product_id', 'quantity').where({ sale_id: id });

      await trx('sales').where({ id }).update({ status: 'cancelled' });

      for (const item of items) {
        await trx('products').where({ id: item.product_id }).increment('stock', item.quantity);
      }

      await trx('receivables').where({ sale_id: id }).del();
    });

    return res.json({ status: 'cancelled' });
  } catch (error) {
    return next(error);
  }
};
