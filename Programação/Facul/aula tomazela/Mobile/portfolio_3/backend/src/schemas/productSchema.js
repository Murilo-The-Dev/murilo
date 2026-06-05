const Joi = require('joi');

module.exports = Joi.object({
  name: Joi.string().trim().required(),
  description: Joi.string().allow('', null),
  price: Joi.number().min(0).required(),
  stock: Joi.number().integer().min(0).required(),
});
