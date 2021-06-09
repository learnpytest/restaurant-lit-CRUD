// 這裡是connect-flash
const express = require('express')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const getBackUrl = function (req, res, next) {
  const url = req.headers.referer
  req.flash('url', url)
  next()
}
module.exports = getBackUrl
// 這裡是connect-flash