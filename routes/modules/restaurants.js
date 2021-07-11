const express = require('express');
const router = express.Router();

const Restaurant = require('../../models/restaurant') // 資料庫模板

// 搜尋功能檔案
const getSearchResults = require('../../modules/getSearchResults')
const verifySearchInputOutput = require('../../modules/verifySearchInputOutput')

// 驗證
const { check, validationResult } = require('express-validator')
const isRestaurantInputValid = require('../../modules/isRestaurantInputValid')
// 驗證

// 這裡是搜尋與排序
router.get('/search/sort', getSearchResults, verifySearchInputOutput, (req, res) => {
  const keyword = req.query.keyword
  const sortOption = req.query.sorting
  const results = req.results
  results.lean()
    .sort(req.sortMethod)
    .then(results => {
      if (req.hasResults) {
        const lengthOfResults = results.length
        return res.render('index', { restaurants: results, results, lengthOfResults, keyword, sortOption, style: 'main.css' })
      } else {
        return res.render('index', {
          errorOfValidation: `<h5 class= "alert alert-warning text-center"> No Search results by keyword: "${keyword}" </h5>`
        })
      }
    })
    .catch(error => console.log(error))
})
// 這裡是搜尋與排序

// 這裡是回復編輯路由
router.get('/:id/edit/back', (req, res) => {
  return res.render('edit', { restaurant: req.flash('body') })
})

// 這裡是編輯路由
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

router.put('/:id', [check('name').trim().isLength({ min: 1 }), check('category').trim().isLength({ min: 1 })], isRestaurantInputValid, (req, res) => {
  const id = req.params.id
  const update = req.body
  return Restaurant.findOneAndUpdate({ "_id": id }, { $set: update })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})
// 這裡是編輯路由

// 這裡是一筆詳細餐廳資料路由
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('detail', { restaurant, style: 'detail.css' }))
    .catch(error => console.log(error))
})
// 這裡是一筆詳細餐廳資料路由

// 這裡是刪除一筆餐廳資料路由
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
// 這裡是刪除一筆餐廳資料路由


// 這裡是新增一筆餐廳資料路由
router.post('/', [check('name').trim().isLength({ min: 1 }), check('category').trim().isLength({ min: 1 })], isRestaurantInputValid, (req, res) => {
  // 驗證名稱與類別以後新增以下資料
  const data = req.body
  return Restaurant.create(data)
    .then(() => res.redirect('/'))
    .catch()
})
// 這裡是新增一筆餐廳資料路由
module.exports = router