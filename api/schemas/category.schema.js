const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const image = Joi.string().uri();

const createCategorieSchema = Joi.object({
  name: name.required(),
  image: image.required(),
});

const updatePartialCategorieSchema = Joi.object({
  name: name,
  image: image,
});

const updateCategorieSchema = Joi.object({
  name: name.required(),
  image: image.required(),
});

const getCategorieSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createCategorieSchema,
  updateCategorieSchema,
  updatePartialCategorieSchema,
  getCategorieSchema,
};
