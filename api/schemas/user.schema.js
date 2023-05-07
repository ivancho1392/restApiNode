const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().alphanum().min(8).max(15);

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
});

const updatePartialUserSchema = Joi.object({
  email: email,
  password: password,
});

const updateUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, updatePartialUserSchema, getUserSchema };
