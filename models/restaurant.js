const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Name is required']
  },
  name_en: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    min: [2, 'Too short content'],
    required: [true, 'Category is required']
  },
  image: String,
  location: String,
  phone: {
    type: Number,
    min: [8, 'Not invalid phone number']
  },
  google_map: String,
  rating: {
    type: Number,
    min: [0, 'Negative number not valid']
  },
  description: String
})

module.exports = mongoose.model('Restaurant', restaurantSchema)