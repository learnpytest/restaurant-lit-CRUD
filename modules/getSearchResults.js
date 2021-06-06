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
  const reg = new RegExp(keyword, 'i')
  req.results = Restaurant.find({ $or: [{ name: { $regex: reg } }, { category: { $regex: reg } }] })
  next()
}
module.exports = getSearchResults

