const Restaurant = require('../models/restaurant') // 載入 todo model
require('../config/mongoose')// 這裡是連線資料庫

const getSearchResults = (req, res, next) => {
  const keyword = req.query.keyword
  // keyword invalid, show user error notice
  if (!keyword.toLowerCase().trim()) {
    req.results = false
    return next()
  }
  // keyword valid
  const regex = new RegExp(keyword, 'i')
  req.results = Restaurant.find({ $or: [{ name: { $regex: regex } }, { category: { $regex: regex } }] })
  const results = req.results.lean()
  next()
}
module.exports = getSearchResults

