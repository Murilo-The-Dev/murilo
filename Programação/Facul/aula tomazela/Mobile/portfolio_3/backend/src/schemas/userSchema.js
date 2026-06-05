const Joi = require('joi');

module.exports = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string().min(6).required(),
});
