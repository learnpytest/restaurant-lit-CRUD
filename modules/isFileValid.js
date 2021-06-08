const { validationResult } = require('express-validator')
const isFileValid = function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    // 顯示驗證失敗的訊息
    console.log(errors, 'Not a JSON file!')
    return res.render('index', {
      error: `<h5 class= "alert alert-warning text-center"> Update failed! Please submit JSON file. </h5><div class="col-12 mr-1 mt-5 text-center"><a href="/"
         class= "badge badge-pill badge-info"
         style="font-size: 16px;" > <i class="fas fa-arrow-left mr-2"></i>Back</a></div>`
    })
  }
  next()
}
module.exports = isFileValid