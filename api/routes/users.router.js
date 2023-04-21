const express = require('express');

const UserService = require('./../services/user.services');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
} = require('./../schemas/user.schema');

const router = express.Router();
const service = new UserService();

router.get('/', async (req, res) => {
  const users = await service.find();
  res.json(users);
});

router.get('/filter', (req, res) => {
  res.send('Yo soy un filter de usuarios');
});

router.get('/:id', validatorHandler(getUserSchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await service.findOne(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.post('/', validatorHandler(createUserSchema, 'body'), async (req, res) => {
  const body = req.body;
  const userName = await service.create(body);
  res.status(201).json(userName);
});

router.patch('/:id',
validatorHandler(getUserSchema, 'params'),
validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await service.update(id, body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await service.delete(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;