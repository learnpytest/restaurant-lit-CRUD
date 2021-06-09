require('../config/mongoose')// 這裡是連線資料庫
const Restaurant = require('../models/restaurant') // 載入 todo model

const getSearchResults = (req, res, next) => {
  const keyword = req.query.keyword
  const trimKeyword = keyword.trim().toLowerCase()
  // keyword invalid, show user error notice
  if (!trimKeyword) {
    const results = false
    return res.render('index', { keyword, results, style: 'main.css' })
  }
  // keyword valid
  const regex = new RegExp(trimKeyword, 'i')
  req.results = Restaurant.find({ $or: [{ name: { $regex: regex } }, { category: { $regex: regex } }] })
  next()
}
module.exports = getSearchResults

