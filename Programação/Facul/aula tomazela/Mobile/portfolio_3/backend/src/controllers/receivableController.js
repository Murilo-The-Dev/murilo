const db = require('../config/database');

exports.getAll = async (req, res, next) => {
  try {
    const { status } = req.query;

    const query = db('receivables as r')
      .join('clients as c', 'c.id', 'r.client_id')
      .select('r.id', 'r.sale_id', 'r.client_id', 'c.name as client_name', 'r.amount', 'r.due_date', 'r.paid_at', 'r.status')
      .orderBy('r.due_date', 'asc');

    if (status) {
      query.where('r.status', status);
    } else {
      query.whereIn('r.status', ['open', 'overdue']);
    }

    const receivables = await query;
    return res.json(receivables);
  } catch (error) {
    return next(error);
  }
};

exports.pay = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const updated = await db.transaction(async (trx) => {
      const receivable = await trx('receivables').where({ id }).first();

      if (!receivable) {
        const err = new Error('Recebivel nao encontrado');
        err.statusCode = 404;
        throw err;
      }

      if (receivable.status === 'paid') {
        const err = new Error('Recebivel ja pago');
        err.statusCode = 422;
        throw err;
      }

      await trx('receivables').where({ id }).update({
        status: 'paid',
        paid_at: trx.fn.now(),
      });

      await trx('sales').where({ id: receivable.sale_id }).update({ status: 'completed' });

      return trx('receivables').select('status', 'paid_at').where({ id }).first();
    });

    return res.json(updated);
  } catch (error) {
    return next(error);
  }
};
