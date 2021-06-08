const Restaurant = require('../models/restaurant') // 資料庫模板
require('../config/mongoose') // 這裡是連線資料庫
function importRestaurant(FILE_PATH) {
  const dataToImport = require(`../uploads/${FILE_PATH}`)
  Restaurant.insertMany(dataToImport.results, (err) => {
    if (err) console.log(err)
  })
}
module.exports = importRestaurant


