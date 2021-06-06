function importRestaurant(FILE_PATH) {
  const mongoose = require('mongoose')
  // 載入Restaurant model
  const dataToImport = require(`../../uploads/${FILE_PATH}`)
  const Restaurant = require('../../models/restaurant')
  // 設定連線到資料庫
  mongoose.connect('mongodb://127.0.0.1:27017/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  Restaurant.insertMany(dataToImport.results, (err) => {
    if (err) console.log(err)
  })
}
module.exports = importRestaurant


