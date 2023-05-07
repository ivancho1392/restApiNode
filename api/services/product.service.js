const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');
const { Category } = require('../db/models/category.model');
const { Op } = require('sequelize');

class ProductService {
  constructor() {}

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find(query) {
    const options = {
      include: ['category'],
      where: {}
    }
    const { limit, offset } = query; //consulta opcional paginacion con limit y offset
    if( limit && offset ) {
      options.limit = limit; //agrega al array options un elemento llamado limit con un valor que viene del query con nombre limit.
      options.offset = offset;
    }
    const { price_min, price_max } = query; //consulta opcional por precio minimo y maximo
    if(price_min && price_max) {
      options.where.price = {
        [Op.gte]: price_min,   //Operador de sequelize verifica cuales precios son mayores a precio minimo
        [Op.lte]: price_max,   //OP de sequelize verifica cuales precios son menores a precio maximo
      };
    }
    const rta = await models.Product.findAll(options);
    return rta;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    return product;
  }

  async update(id, changes) {
    const product = await this.findOne(id);
    const rta = await product.update(changes);
    return rta;
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return { id };
  }
}

module.exports = ProductService;
