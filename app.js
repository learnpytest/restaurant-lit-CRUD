const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')
const exphbs = require('express-handlebars')
const express = require('express')
const app = express()
const port = 3000
// 設定handlebars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')
// 設定連線到資料庫
mongoose.connect('mongodb://127.0.0.1:27017/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
// 取得資料庫連線狀態
// 連線異常
mongoose.connection.on('error', () => {
  return console.log('mongodb error!')
})
// 連線正常
mongoose.connection.once('open', () => {
  return console.log('mongoose connect!')
})
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))

})

app.listen(port, () => {
  console.log(`The server is running on https://localhost:${port}`)
})