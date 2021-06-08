const config = require('./config')
// 這裡是連線資料庫
const mongoose = require('mongoose')
mongoose.connect(config.mongoose.url, config.mongoose.params)
// 這裡是連線資料庫

// 這裡是連線狀態
const db = mongoose.connection
db.on('error', () => {
  return console.log('mongodb error!')
})
db.once('open', () => {
  return console.log('mongoose connect!')
})
// 這裡是連線狀態

module.exports = db