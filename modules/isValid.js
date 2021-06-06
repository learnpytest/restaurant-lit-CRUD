const isValid = (req, res, next) => {
  const { validationResult } = require('express-validator')
  const { name, category } = req.body
  const errors = validationResult(req)
  let errMessage = ''
  errors.array().forEach(err => {
    errMessage += `<pre>The ${err.param}: "${err.value}" that you provided is not a restaurant name!</pre>`
  })
  console.log(errMessage)
  // 如果有錯誤訊息＝驗證失敗
  if (!errors.isEmpty()) {
    // 顯示驗證失敗的訊息
    return res.render('index', {
      error: `<h5 class= "alert alert-warning text-center"> Restaurant creation failed! ${errMessage}</h5><div class="col-12 mr-1 mt-5 text-center"><a href="/"
         class= "badge badge-pill badge-info"
         style="font-size: 16px;" > <i class="fas fa-arrow-left mr-2"></i>Back</a></div>`
    })
  }
  next()
}
module.exports = isValid