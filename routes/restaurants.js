const express = require('express');
const app = express()
const router = express.Router();
const Restaurant = require('../models/restaurant')
// 搜尋功能檔案
const getSearchResults = require('../modules/getSearchResults')
// 搜尋功能檔案

// 驗證
const { check, validationResult } = require('express-validator')
const isValid = require('../modules/isValid')
// 驗證

router.use(express.static('public'))
router.use(express.urlencoded({ extended: true }))

// 這裡是回到前一頁的路由
app.partials = {}
router.get('/restaurants/backs', (req, res) => {
  const backURL = req.header('Referer') + '/..'
  const back = app.partials.backURL
  res.redirect(back)
  app.partials.backURL = backURL
})
// 這裡是回到前一頁的路由

// 這裡是搜尋功能的路由
router.get('/restaurants/search', getSearchResults, (req, res) => {
  // keyword invalid, show user error notice
  const keyword = req.query.keyword
  const results = req.results
  if (!results) return res.render('index', { keyword, results, style: 'main.css' })
  results.lean()
    .then(results => {
      req.currentRestaurants = results
      const length = results.length
      return res.render('index', { restaurants: req.currentRestaurants, length, keyword, results, style: 'main.css' })
    })
    .catch(error => console.log(error))
})
// 這裡是搜尋功能的路由

// 這裡是編輯路由
router.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  const backURL = req.header('Referer')
  app.partials.backURL = backURL
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

router.post('/restaurants/:id/edit', [check('name').trim().isLength({ min: 1 }), check('category').trim().isLength({ min: 1 })], isValid, (req, res) => {
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
router.post('/restaurants', [check('name').trim().isLength({ min: 1 }), check('category').trim().isLength({ min: 1 })], isValid, (req, res) => {
  // 驗證名稱與類別以後新增以下資料
  const data = req.body
  return Restaurant.create(data)
    .then(() => res.redirect('/'))
    .catch()
})
// 這裡是新增一筆餐廳資料路由
module.exports = router