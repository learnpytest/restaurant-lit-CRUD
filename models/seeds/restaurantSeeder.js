
const Restaurant = require('../restaurant.js') // 資料模板
const restaurantData = require('./restaurant.json') // 種子資料內容
const db = require('../../config/mongoose') // 設定連線到資料庫

// 取得資料庫連線狀態
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  Restaurant.insertMany(restaurantData.results, (err) => {
    if (err) return console.log('insert documents error')
  })
  Restaurant.createIndexes({ '$**': 'text' })
  console.log('monoose connected!')
  return console.log('insert documents done!')
})

