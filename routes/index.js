const express = require('express')
const router = express.Router()

// 這裡是排序
const getSortMethod = require('../modules/getSortMethod')
//這裡是排序

// 這裡是connect-flash
const getBackUrl = require('../modules/getBackUrl')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')
router.use(cookieParser('secret'))
router.use(session({ secret: 'secret', resave: true, saveUninitialized: true }))
router.use(flash())
router.use(getBackUrl, getSortMethod, (req, res, next) => {
  const url = req.flash('url')
  res.locals.url = url[0]
  next()
})
// 這裡是connect - flash

//一些路由模組
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const upload = require('./modules/upload')

const isNotEmptySubmit = require('../modules/isNotEmptySubmit')

router.use('/upload', upload)
router.use('/restaurants', function (req, res, next) {
  if (isNotEmptySubmit(req, res)) {
    return restaurants(req, res, next)
  } else {
    return home(req, res)
  }
})
router.use('/', home)

module.exports = router