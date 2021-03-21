const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const validateRegisterInput = require('../validation/registerValidation');

const User = require('../models/User');

router.post('/', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { firstName, lastName, email, password, street, city, state, zipCode } = req.body;

  User.findOne({ email })
    .then(user => {
      if (user) return res.status(400).json({ msg: 'User already exists' });

      const newUser = new User({
        firstName,
        lastName,
        email,
        street,
        city,
        state,
        zipCode,
        password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => {
              jwt.sign(
                { id: user.id },
                process.env.JWT_SECRET,
                { expiresIn: 604800 },
                (err, token) => {
                  if (err) throw err;
                  sessionData = req.session;
                  sessionData.access_token = token;
                  res.json({
                    user: {
                      id: user.id,
                      name: user.name,
                      email: user.email,
                      street: user.street,
                      city: user.city,
                      state: user.state,
                      zipCode: user.zipCode
                    },
                    sessionData
                  })
                }
              )
            })
        })
      })
    })
})

module.exports = router;