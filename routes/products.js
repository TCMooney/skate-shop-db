const express = require('express');
const router = express.Router();

const Product = require('../models/Product');

router.get('/', (req, res) => {
  Product.find()
    .sort({ date: -1 })
    .then(products => res.json(products))
    .catch(err => res.status(404).json(err));
})

router.post('/newProduct', (req, res) => {
  const newProduct = new Product({
    name: req.body.name,
    quantity: req.body.quantity,
    description: req.body.description,
    imageURL: req.body.imageURL
  });

  newProduct.save()
    .then(product => res.json(product))
    .catch(err => res.status(404).json(err));
})

router.delete('/deleteProduct/:id', (req, res) => {
  Product.findById(req.params.id)
    .then(product => product.remove()
      .then(() => res.json({ success: true })))
    .catch(err => cosnsole.log(err))
})

module.exports = router;