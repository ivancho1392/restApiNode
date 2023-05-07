const express = require('express');

const OrderService = require('./../services/order.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createOrderSchema,
  getOrderSchema,
  addItemSchema,
} = require('./../schemas/order.schema');

const router = express.Router();
const service = new OrderService();

router.get('/', async (req, res, next) => {
  try {
    res.json(await service.find());
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getOrderSchema, 'params'),
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
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.status(201).json(await service.create(body));
    } catch (error) {
      next(error);
    }
  }
);

router.post('/add-item',
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newItem = await service.addItem(body);
      res.status(201).json(newItem);
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
