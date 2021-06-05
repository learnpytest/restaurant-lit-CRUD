function getSearchResults(keyword) {
  // keyword is not valid
  if (!keyword.toLowerCase().trim()) return 0
  // keyword valid
  const mongoose = require('mongoose')
  const Restaurant = require('./restaurant') // 載入 todo model
  mongoose.connect('mongodb://127.0.0.1:27017/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  const reg = new RegExp(keyword, 'i')
  const results = Restaurant.find({ $or: [{ name: { $regex: reg } }, { category: { $regex: reg } }] })
  return results
}

module.exports = getSearchResults

