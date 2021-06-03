const mongoose = require('mongoose')
const restaurantData = require('./restaurant.json')
// 載入Restaurant model
const Restaurant = require('../restaurant.js')
// 設定連線到資料庫
mongoose.connect('mongodb://127.0.0.1:27017/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線正常
db.once('open', () => {
  Restaurant.insertMany(restaurantData.results, (err) => {
    if (err) return console.log('insert documents error')
  })
  console.log('monoose connected!')
  return console.log('insert documents done!')

})

