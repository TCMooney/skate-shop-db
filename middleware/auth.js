const jwt = require('jsonwebtoken');

function auth(req,res, next) {
  const token = req.session.access_token;

  if(!token) return res.status(401).json({ auth: false, msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = decoded;
    next()
  } catch (e) {
    res.status(400).json({msg: 'Token is not valid'})
  }
}

module.exports = auth