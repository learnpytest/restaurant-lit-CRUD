const express = require('express');
const app = express()
const router = express.Router();
const Restaurant = require('../models/restaurant')
// 搜尋功能檔案
const getSearchResults = require('../modules/getSearchResults')
// 搜尋功能檔案

// 驗證
const { check, validationResult } = require('express-validator')
const isRestaurantInputValid = require('../modules/isRestaurantInputValid')
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

      // 這裡是將沒有找搜尋結果提示給使用者
      if (!results.length) return res.render('index', {
        error: `<h5 class= "alert alert-warning text-center"> No Search results by keyword: "${keyword}" </h5><div class="col-12 mr-1 mt-5 text-center"><a href="/"
         class= "badge badge-pill badge-info"
         style="font-size: 16px;" > <i class="fas fa-arrow-left mr-2"></i>Back</a></div>`
      })
      // 這裡是將沒有找搜尋結果提示給使用者

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
module.exports = router