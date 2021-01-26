const express = require('express');
const router = express.Router();

const Links = require('../models/Links');

router.get('/', (req, res) => {
  Links.find()
    .then(links => res.json(links))
    .catch(err => res.status(404).json(err));
});

router.post('/new', (req, res) => {
  const { title, path, imageURL } = req.body;
  const newLink = new Links({
    title,
    path,
    imageURL
  });
  newLink.save().then(link => res.json({
    title: link.title,
    path: link.path,
    imageURL: link.imageURL
  }))
    .catch(err => console.log(err))
})

router.put('/edit/:id', (req, res) => {
  Links.findById(req.params.id, (err, link) => {
    if (!link) {
      return res.status(404).json({ msg: 'Link data not found' });
    } else {
      link.title = req.body.title;
      link.path = req.body.path;
      link.imageURL = req.body.imageURL;

      link.save((err) => {
        if (err) {
          return res.json({ msg: 'An error has occured editing the link' })
        } else {
          return res.json({ msg: 'Link Edit Successful' })
        }
      })
    }
  })
})

module.exports = router;