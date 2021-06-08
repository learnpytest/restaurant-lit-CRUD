const { Router } = require('express');
const express = require('express')
const router = Router()

// 這裡是上傳檔案
const multer = require('multer');
const UPLOAD_PATH = '../uploads'
const upload = multer({ dest: UPLOAD_PATH })
const fileReadWrite = require('../modules/fileReadWrite')
// 這裡是上傳檔案

// 這裡是驗證
const { check } = require('express-validator')
const isFileValid = require('../modules/isFileValid')
// 這裡是驗證

// 這裡是上傳檔案
router.post('/upload', upload.single('fileUpload'), check('fileUpload')
  .custom((value, { req }) => {
    console.log(req.file.mimetype)
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