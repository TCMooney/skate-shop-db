const express = require('express');
const router = express.Router();
const { cloudinary } = require('../cloudinary')

const Product = require('../models/Product');

router.get('/', (req, res) => {
  Product.find()
    .sort({ date: -1 })
    .then(products => res.json(products))
    .catch(err => res.status(404).json(err));
})

router.get('/productDetail/:id', (req, res) => {
  Product.findById(req.params.id)
    .then((product) => {
      res.json(product)
    })
    .catch((err) => {
      res.status(404).json(err)
      console.log(err)
    })
})

router.post('/new', async (req, res) => {
  try {
    const { itemName, quantity, description, imageData, brand, category, price } = req.body;
    const uploadResponse = await cloudinary.uploader.upload(imageData, { upload_preset: 'skate_shop_products' })
    const imageUrl = uploadResponse.url;
    const newProduct = new Product({
      name: itemName,
      quantity,
      description,
      imageUrl,
      brand,
      category,
      price
    });
    newProduct.save().then(product => res.json({
      name: product.name,
      quantity: product.quantity,
      description: product.description,
      imageUrl: product.imageURL,
      brand: product.brand,
      category: product.category,
      price: product.price
    }))
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Upload Failed' })
  }
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
          return res.json({ msg: 'An error has occured editing the product' })
        } else {
          return res.json({ msg: ' Product Edit Successful' })
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