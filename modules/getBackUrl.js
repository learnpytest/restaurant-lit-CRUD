// 這裡是connect-flash
const getBackUrl = function (req, res, next) {
  const url = req.headers.referer
  req.flash('url', url)
  res.locals.url = req.flash('url')[0]
  req.flash('body', req.body)
  next()
}
module.exports = getBackUrl
// 這裡是connect-flash