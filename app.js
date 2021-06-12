const config = require('./config/config')
const express = require('express')
const exphbs = require('express-handlebars')
const helpers = require('handlebars-helpers')()
const methodOverride = require('method-override') //method-override

const routes = require('./routes') //總路由器
require('./config/mongoose')

const app = express()
const PORT = process.env.PORT || config.port

// 以下是一些設定, handlebars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs', helpers: { eq: helpers.eq } }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method')) //method-override
app.use(express.static('public')) //靜態檔案

app.use(routes)

// 啟動伺服器
app.listen(PORT, () => {
  console.log(`The server is running on https://localhost:${PORT}`)
})