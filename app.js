const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')
const exphbs = require('express-handlebars')
const express = require('express')
const app = express()
const port = 3000
// 搜尋功能
const getSearchResults = require('./models/search-service.js')

// 設定handlebars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')
// 設定連線到資料庫
mongoose.connect('mongodb://127.0.0.1:27017/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
// 取得資料庫連線狀態
// 連線異常
mongoose.connection.on('error', () => {
  return console.log('mongodb error!')
})
// 連線正常
mongoose.connection.once('open', () => {
  return console.log('mongoose connect!')
})
// 設定handlebars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

// 設定body parser，public
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// 搜尋功能
app.get('/restaurants/search', (req, res) => {
  if (!app.locals.partials) {
    app.locals.partials = {};
  }
  // this will trigger search template to show search related information on page
  app.locals.partials.isOnSearched = true
  const keyword = req.query.keyword
  // show search information - remind user enter something and return function, no view action done
  if (!keyword.length) {
    app.locals.partials.isSearchInputValid = false
    return res.redirect('/')
  }
  let results = getSearchResults(keyword)
  results.lean()
    .then(restaurants => res.render('index', { restaurants, style: 'main.css' }))

})






app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('detail', { restaurant, style: 'detail.css' }))
    .catch(error => console.log(error))
})

app.post('/restaurants/:id/edit', (req, res) => {
  const update = req.body
  const id = req.params.id
  return Restaurant.findOneAndUpdate({ "_id": id }, { $set: update })
    .then(() => {
      res.redirect(`/restaurants/${id}`)
    })
    .catch(error => console.log(error))
})

app.post('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 新增一筆資料
app.post('/restaurants', (req, res) => {
  const data = req.body
  return Restaurant.create(data)
    .then(() => res.redirect('/'))
    .catch()
  // const data = req.body
  // const newRestaurant = new Restaurant(data)
  // newRestaurant.save().then(() => res.redirect('/'))
})
app.get('/', (req, res) => {
  return Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants, style: 'main.css' }))
    .catch(error => console.log(error))

})
// 引入多筆資料


app.listen(port, () => {
  console.log(`The server is running on https://localhost:${port}`)
})