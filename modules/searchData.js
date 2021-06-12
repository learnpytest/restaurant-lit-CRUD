const Restaurant = require('../models/restaurant') // 資料庫模板
const searchData = function (keyword) {
  const regex = new RegExp(keyword, 'i')
  return Restaurant.find({ $or: [{ name: { $regex: regex } }, { category: { $regex: regex } }] })
}
module.exports = searchData