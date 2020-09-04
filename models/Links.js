const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LinksSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  }
})

module.exports = Links = mongoose.model('links', LinksSchema);