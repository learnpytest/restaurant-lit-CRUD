const { Router } = require('express');
const express = require('express')
const router = Router()

// 這裡是上傳檔案
const multer = require('multer');
const UPLOAD_PATH = '../../uploads'
const upload = multer({ dest: UPLOAD_PATH })
const fileReadWrite = require('../../modules/fileReadWrite')
// 這裡是上傳檔案

// 這裡是驗證
const { check } = require('express-validator')
const isFileValid = require('../../modules/isFileValid')
// 這裡是驗證

// 這裡是connect-flash
const getBackUrl = require('../../modules/getBackUrl')
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

// 這裡是上傳檔案
router.post('/', upload.single('fileUpload'), check('fileUpload')
  .custom((value, { req }) => {
    if (req.file.mimetype === 'application/json') {
      return 'application/json'
    } else {
      return false
    }
  }), isFileValid, fileReadWrite, (req, res) => {
    return res.redirect('/')
  })
// 這裡是上傳檔案

module.exports = router