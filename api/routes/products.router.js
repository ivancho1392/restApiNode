const express = require('express');

const ProductService = require('./../services/product.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  updatePartialProductSchema,
  queryProductSchema,
} = require('./../schemas/product.schema');

const router = express.Router();
const service = new ProductService();

router.get('/',
validatorHandler(queryProductSchema, 'query'),
async (req, res, next) => {
  try {
    res.json(await service.find(req.query));
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.json(await service.findOne(id));
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.status(201).json(await service.create(body));
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
validatorHandler(getProductSchema, 'params'),
validatorHandler(updatePartialProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      res.json(await service.update(id, body));
    } catch (error) {
      next(error);
    }
  }
);

router.put('/:id',
validatorHandler(getProductSchema, 'params'),
validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      res.json(await service.update(id, body));
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    res.json(await service.delete(id));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
