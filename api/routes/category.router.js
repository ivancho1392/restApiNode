const express = require('express');

const CategorieService = require('../services/category.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createCategorieSchema,
  updateCategorieSchema,
  getCategorieSchema,
  updatePartialCategorieSchema,
} = require('../schemas/category.schema');

const router = express.Router();
const service = new CategorieService();

router.get('/', async (req, res, next) => {
  try {
    res.json(await service.find());
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getCategorieSchema, 'params'),
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
  validatorHandler(createCategorieSchema, 'body'),
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
validatorHandler(getCategorieSchema, 'params'),
validatorHandler(updatePartialCategorieSchema, 'body'),
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
validatorHandler(getCategorieSchema, 'params'),
validatorHandler(updateCategorieSchema, 'body'),
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
