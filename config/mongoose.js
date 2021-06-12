const config = require('./config')
// 這裡是連線資料庫
const mongoose = require('mongoose')
const MONGODB_URL = process.env.MONGODB_URL || config.mongoose.url
mongoose.connect(MONGODB_URL, config.mongoose.params)
// 這裡是連線資料庫

// 這裡是連線狀態
const db = mongoose.connection
db.on('error', () => {
  return console.log('mongodb error!')
})
db.once('open', () => {
  return console.log('mongodb connect!')
})
// 這裡是連線狀態

module.exports = db