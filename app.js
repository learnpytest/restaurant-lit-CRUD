const config = require('./config/config')
const exphbs = require('express-handlebars')
const express = require('express')
const app = express()
const methodOverride = require('method-override') //method-override

const routes = require('./routes') //總路由器

// 以下是一些設定, handlebars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public')) //靜態檔案
app.use(express.urlencoded({ extended: true }))

app.use(methodOverride('_method')) //method-override
app.use(routes)

// 啟動伺服器
app.listen(config.port, () => {
  console.log(`The server is running on https://localhost:${config.port}`)
})