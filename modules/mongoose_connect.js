const mongoose_connect = () => {
  const mongoose = require('mongoose')
  // 這裡是連線資料庫
  mongoose.connect('mongodb://127.0.0.1:27017/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  mongoose.connection.on('error', () => {
    return console.log('mongodb error!')
  })
  mongoose.connection.once('open', () => {
    return console.log('mongoose connect!')
  })
}

// 這裡是連線資料庫
module.exports = mongoose_connect