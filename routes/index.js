const express = require('express')
const router = express.Router()

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

//一些路由模組
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const upload = require('./modules/upload')


router.use('/', home)
router.use('/restaurants', restaurants)
router.use('/upload', upload)

module.exports = router