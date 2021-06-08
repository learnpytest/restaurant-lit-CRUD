const verifySearchInputOutput = (req, res, next) => {
  const keyword = req.query.keyword
  const results = req.results
  // 沒有輸入關鍵字提示使用者
  if (!results) return res.render('index', { keyword, results, style: 'main.css' })
  results.lean()
    .then(results => {
      // 這裡是將沒有找搜尋結果提示給使用者
      if (!results.length) return res.render('index', {
        error: `<h5 class= "alert alert-warning text-center"> No Search results by keyword: "${keyword}" </h5><div class="col-12 mr-1 mt-5 text-center"><a href="/"
         class= "badge badge-pill badge-info"
         style="font-size: 16px;" > <i class="fas fa-arrow-left mr-2"></i>Back</a></div>`
      })
    }).catch(error => console.log(error))
  next()
}
module.exports = verifySearchInputOutput