const getSearchResults = (req, res, next) => {
  const keyword = req.query.keyword
  // keyword invalid, show user error notice
  if (!keyword.toLowerCase().trim()) {
    req.results = false
    return next()
  }
  // keyword valid
  // 這裡是連線資料庫
  const mongoose_connect = require('./mongoose_connect')
  mongoose_connect()
  // 這裡是連線資料庫
  const Restaurant = require('../models/restaurant') // 載入 todo model
  const regex = new RegExp(keyword, 'i')
  req.results = Restaurant.find({ $or: [{ name: { $regex: regex } }, { category: { $regex: regex } }] })
  const results = req.results.lean()
  console.log(results.length)
  next()
}
module.exports = getSearchResults

