const config = require('./config/config')
const Restaurant = require('./models/restaurant')
const exphbs = require('express-handlebars')
const express = require('express')
const app = express()
const methodOverride = require('method-override') //method-override
require('./config/mongoose') // 這裡是連線資料庫

// 一些路由檔案
const restaurants = require('./routes/restaurants')
const upload = require('./routes/upload')
const index = require('./routes/index')
// 一些路由檔案

// 以下是一些設定, handlebars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(methodOverride('_method')) //method-override

// 這裡是路由
app.use(restaurants) //creat, read, update, delete
app.use(upload)
app.use(index)

// 啟動伺服器
app.listen(config.port, () => {
  console.log(`The server is running on https://localhost:${config.port}`)
})