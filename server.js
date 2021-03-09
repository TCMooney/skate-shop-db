const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');

dotenv.config({ path: './config/config.env' })

require('./config/passport')(passport)

const products = require('./routes/products');
const auth = require('./routes/auth');
const user = require('./routes/users');

const app = express();

app.use(cors());

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  proxy: true,
  name: 'auth_session',
  resave: false,
  unset: 'destroy',
  saveUninitialized: true,
  cookie: {
    sameSite: 'none',
    secure: true,
    httpOnly: true,
    maxAge: 60000 * 60 * 24
  }
}))

app.use(passport.initialize())
app.use(passport.session())

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use('/products', products);
app.use('/auth', auth);
app.use('/user', user);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));