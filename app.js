const config = require('./configs/config')
// const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')
const exphbs = require('express-handlebars')
const helpers = require('handlebars-helpers')
const express = require('express')
const app = express()
app.locals.partials = {}
const myGlobal = {}

// 這裡是連線資料庫
const mongoose_connect = require('./modules/mongoose_connect')
mongoose_connect()
// 這裡是連線資料庫

// 一些路由檔案
const restaurants = require('./routes/restaurants')
const upload = require('./routes/upload')
const index = require('./routes/index')
// 一些路由檔案

// 以下是一些設定, handlebars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs', helpers: { isglobal: function (value) { return myGlobal[value] } } }))
app.set('view engine', 'hbs')
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

// 這裡是路由
app.use(restaurants)
app.use(upload)
app.use(index)

app.listen(config.port, () => {
  console.log(`The server is running on https://localhost:${config.port}`)
})