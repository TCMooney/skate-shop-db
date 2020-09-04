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
  const { name, quantity, description, imageURL, brand, category } = req.body;
  const newProduct = new Product({
    name,
    quantity,
    description,
    imageURL,
    brand,
    category
  });
  newProduct.save().then(product => res.json({
    name: product.name,
    quantity: product.quantity,
    description: product.description,
    imageURL: product.imageURL,
    brand: product.brand,
    category: product.category
  }))
})

router.put('/edit/:id', (req, res) => {
  Product.findById(req.params.id, (err, product) => {
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    } else {
      product.name = req.body.name;
      product.quantity = req.body.quantity;
      product.description = req.body.description;
      product.imageURL = req.body.imageURL;
      product.brand = req.body.brand;
      product.category = req.body.category;

      product.save((err) => {
        if (err) {
          console.log(err)
          return res.json({ msg: 'An error has occured ' })
        } else {
          return res.json({ msg: 'Edit Successful' })
        }
      })
    }
  })
})

router.delete('/deleteProduct/:id', (req, res) => {
  Product.findById(req.params.id)
    .then(product => product.remove()
      .then(() => res.json({ success: true })))
    .catch(err => cosnsole.log(err))
})

module.exports = router;