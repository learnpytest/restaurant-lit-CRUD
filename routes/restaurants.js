const express = require('express');
const app = express()
const router = express.Router();

const Restaurant = require('../models/restaurant') // 資料庫模板

// 搜尋功能檔案
const getSearchResults = require('../modules/getSearchResults')
const verifySearchInputOutput = require('../modules/verifySearchInputOutput')

// 驗證
const { check, validationResult } = require('express-validator')
const isRestaurantInputValid = require('../modules/isRestaurantInputValid')
// 驗證

// 這裡是connect-flash
const getBackUrl = require('../modules/getBackUrl')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')
router.use(cookieParser('secret'))
router.use(session({ secret: 'secret', resave: true, saveUninitialized: true }))
router.use(flash())
router.use(getBackUrl, (req, res, next) => {
  const url = req.flash('url')
  res.locals.url = url[0]
  next()
})
// 這裡是connect-flash

router.use(express.static('public'))
router.use(express.urlencoded({ extended: true }))

// 這裡是搜尋功能的路由
router.get('/restaurants/search', getSearchResults, verifySearchInputOutput, (req, res) => {
  const keyword = req.query.keyword
  const results = req.results
  results.lean()
    .then(results => {
      const length = results.length
      if (req.hasResults) {
        return res.render('index', { restaurants: results, results, length, keyword, style: 'main.css' })
      } else {
        return res.render('index', {
          error: `<h5 class= "alert alert-warning text-center"> No Search results by keyword: "${keyword}" </h5>`
        })
      }
    })
    .catch(error => console.log(error))
})
// 這裡是搜尋功能的路由

// 這裡是編輯路由
router.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  // const edit = true
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant, edit: true }))
    .catch(error => console.log(error))
})

router.post('/restaurants/:id/edit', [check('name').trim().isLength({ min: 1 }), check('category').trim().isLength({ min: 1 })], isRestaurantInputValid, (req, res) => {
  const id = req.params.id
  const update = req.body
  return Restaurant.findOneAndUpdate({ "_id": id }, { $set: update })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})
// 這裡是編輯路由

// 這裡是一筆詳細餐廳資料路由
router.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('detail', { restaurant, style: 'detail.css' }))
    .catch(error => console.log(error))
})
// 這裡是一筆詳細餐廳資料路由

// 這裡是刪除一筆餐廳資料路由
router.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
// 這裡是刪除一筆餐廳資料路由


// 這裡是新增一筆餐廳資料路由
router.post('/restaurants', [check('name').trim().isLength({ min: 1 }), check('category').trim().isLength({ min: 1 })], isRestaurantInputValid, (req, res) => {
  // 驗證名稱與類別以後新增以下資料
  const data = req.body
  return Restaurant.create(data)
    .then(() => res.redirect('/'))
    .catch()
})
// 這裡是新增一筆餐廳資料路由

// router.get('/restaurants', (req, res) => {
//   res.redirect('/')
// })

module.exports = router