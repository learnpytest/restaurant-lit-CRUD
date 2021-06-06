const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant')
// 搜尋功能檔案
const getSearchResults = require('../modules/getSearchResults')

router.use(express.static('public'))
router.use(express.urlencoded({ extended: true }))

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
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

router.post('/restaurants/:id/edit', (req, res) => {
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
router.post('/restaurants', (req, res) => {
  const data = req.body
  return Restaurant.create(data)
    .then(() => res.redirect('/'))
    .catch()
  // const data = req.body
  // const newRestaurant = new Restaurant(data)
  // newRestaurant.save().then(() => res.redirect('/'))
})
// 這裡是新增一筆餐廳資料路由



module.exports = router