const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant') // 取得資料庫資料

//一些路由模組
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const upload = require('./modules/upload')

router.use('/', home)
router.use('/restaurants', restaurants)
router.use('/upload', upload)

module.exports = router