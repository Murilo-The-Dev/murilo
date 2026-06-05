const Joi = require('joi');

const cpfRegex = /^(\d{14}|\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})$/;

module.exports = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().trim().email().allow('', null),
  phone: Joi.string().trim().allow('', null),
  cpf: Joi.string().trim().pattern(cpfRegex).allow('', null),
  address: Joi.string().allow('', null),
});
