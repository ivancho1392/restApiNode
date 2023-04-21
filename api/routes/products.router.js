const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json([
    {
      name: 'product1',
      price: 2000,
    },
    {
      name: 'product2',
      price: 3000,
    },
  ]);
  res.json(products);
});

router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: 'Product 3',
    price: 2000
  });
});

module.exports = router;
