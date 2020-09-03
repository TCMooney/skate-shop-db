const express = require('express');
const router = express.Router();

const Product = require('../models/Product');

router.get('/', (req, res) => {
  Product.find()
    .sort({ date: -1 })
    .then(products => res.json(products))
    .catch(err => res.status(404).json(err));
})

router.post('/new', (req, res) => {
  const { name, quantity, description, imageURL } = req.body;
  const newProduct = new Product({
    name,
    quantity,
    description,
    imageURL
  });
  newProduct.save().then(product => res.json({
    name: product.name,
    quantity: product.quantity,
    description: product.description,
    imageURL: product.imageURL
  }))
})

router.delete('/deleteProduct/:id', (req, res) => {
  Product.findById(req.params.id)
    .then(product => product.remove()
      .then(() => res.json({ success: true })))
    .catch(err => cosnsole.log(err))
})

module.exports = router;