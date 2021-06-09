const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant') // 取得資料庫資料
// 這裡是connect-flash
const getBackUrl = require('../modules/getBackUrl')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')
router.use(cookieParser('secret'))
router.use(session({ secret: 'secret', resave: true, saveUninitialized: true }))
router.use(flash())
router.use(getBackUrl)
// 這裡是connect-flash


router.get('/', (req, res) => {
  const backURL = req.backURL
  return Restaurant.find()
    .lean()
    .then(restaurants => {
      return res.render('index', { restaurants, style: 'main.css' })
    })
    .catch(error => console.log(error))
})
module.exports = router