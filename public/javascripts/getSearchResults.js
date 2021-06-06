const getSearchResults = (req, res, next) => {
  const keyword = req.query.keyword
  // keyword invalid, show user error notice
  if (!keyword.toLowerCase().trim()) {
    req.results = false
    return next()
  }
  // keyword valid
  const mongoose = require('mongoose')
  const Restaurant = require('../../models/restaurant') // 載入 todo model
  mongoose.connect('mongodb://127.0.0.1:27017/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  const reg = new RegExp(keyword, 'i')
  req.results = Restaurant.find({ $or: [{ name: { $regex: reg } }, { category: { $regex: reg } }] })
  next()
}
module.exports = getSearchResults

