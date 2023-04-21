const Joi = require('joi');

const id = Joi.string().alphanum();
const name = Joi.string().alphanum().min(3).max(15);
const role = Joi.string().alphanum().min(3).max(15);

const createUserSchema = Joi.object({
  name: name.required(),
  role: role.required(),
});

const updateUserSchema = Joi.object({
  name: name,
  role: role,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
