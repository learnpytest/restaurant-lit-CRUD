const mongoose_connect = () => {
  const config = require('../configs/config')
  const mongoose = require('mongoose')
  // 這裡是連線資料庫
  mongoose.connect(config.mongoose.url, config.mongoose.params)
  mongoose.connection.on('error', () => {
    return console.log('mongodb error!')
  })
  mongoose.connection.once('open', () => {
    return console.log('mongoose connect!')
  })
}
// 這裡是連線資料庫
module.exports = mongoose_connect