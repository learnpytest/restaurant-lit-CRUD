const { validationResult } = require('express-validator')

const isRestaurantInputValid = (req, res, next) => {
  const { name, category } = req.body
  const errors = validationResult(req)
  let errMessage = ''
  errors.array().forEach(err => {
    errMessage += `<pre>The ${err.param}: "${err.value}" that you provided is not a restaurant ${err.param}!</pre>`
  })
  // 如果有錯誤訊息＝驗證失敗
  if (!errors.isEmpty()) {
    // 顯示驗證失敗的訊息
    return res.render('index', {
      errorOfValidation: `<h5 class= "alert alert-warning text-center"> Update failed! ${errMessage}</h5>`
    })
  }
  next()
}
module.exports = isRestaurantInputValid