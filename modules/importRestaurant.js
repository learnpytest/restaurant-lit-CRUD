function importRestaurant(FILE_PATH) {
  // 載入Restaurant model
  const dataToImport = require(`../uploads/${FILE_PATH}`)
  const Restaurant = require('../models/restaurant')

  // 這裡是連線資料庫
  const mongoose_connect = require('./mongoose_connect')
  mongoose_connect()
  // 這裡是連線資料庫
  Restaurant.insertMany(dataToImport.results, (err) => {
    if (err) console.log(err)
  })
}
module.exports = importRestaurant


