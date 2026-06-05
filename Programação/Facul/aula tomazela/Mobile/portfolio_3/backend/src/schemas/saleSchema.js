const Joi = require('joi');

module.exports = Joi.object({
  client_id: Joi.number().integer().positive().required(),
  items: Joi.array()
    .items(
      Joi.object({
        product_id: Joi.number().integer().positive().required(),
        quantity: Joi.number().integer().min(1).required(),
      })
    )
    .min(1)
    .required(),
});
