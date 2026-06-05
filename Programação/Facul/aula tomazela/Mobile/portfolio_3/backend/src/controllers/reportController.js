const db = require('../config/database');

exports.sales = async (req, res, next) => {
  try {
    const { start, end } = req.query;

    if (!start || !end) {
      return res.status(400).json({ error: 'Parametros start e end sao obrigatorios' });
    }

    const rows = await db('sales')
      .select(db.raw('DATE(created_at) as date'))
      .count('* as count')
      .sum({ total: 'total' })
      .whereNot('status', 'cancelled')
      .andWhereBetween('created_at', [`${start} 00:00:00`, `${end} 23:59:59`])
      .groupByRaw('DATE(created_at)')
      .orderBy('date', 'asc');

    const response = rows.map((row) => ({
      date: row.date,
      count: Number(row.count || 0),
      total: Number(row.total || 0),
    }));

    return res.json(response);
  } catch (error) {
    return next(error);
  }
};

exports.receivables = async (req, res, next) => {
  try {
    const { status } = req.query;

    const query = db('receivables')
      .select('status')
      .count('* as count')
      .sum({ total: 'amount' })
      .groupBy('status');

    if (status) {
      query.where({ status });
    }

    const rows = await query;

    const grouped = {
      open: { count: 0, total: 0 },
      paid: { count: 0, total: 0 },
      overdue: { count: 0, total: 0 },
    };

    rows.forEach((row) => {
      grouped[row.status] = {
        count: Number(row.count || 0),
        total: Number(row.total || 0),
      };
    });

    if (status) {
      return res.json({ [status]: grouped[status] || { count: 0, total: 0 } });
    }

    return res.json(grouped);
  } catch (error) {
    return next(error);
  }
};

exports.topProducts = async (req, res, next) => {
  try {
    const limit = Number(req.query.limit || 5);

    const rows = await db('sale_items as si')
      .join('products as p', 'p.id', 'si.product_id')
      .join('sales as s', 's.id', 'si.sale_id')
      .whereNot('s.status', 'cancelled')
      .select('p.name as product_name')
      .sum({ quantity_sold: 'si.quantity' })
      .sum({ revenue: 'si.subtotal' })
      .groupBy('p.id', 'p.name')
      .orderBy('quantity_sold', 'desc')
      .limit(limit);

    const response = rows.map((row) => ({
      product_name: row.product_name,
      quantity_sold: Number(row.quantity_sold || 0),
      revenue: Number(row.revenue || 0),
    }));

    return res.json(response);
  } catch (error) {
    return next(error);
  }
};
