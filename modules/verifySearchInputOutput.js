const verifySearchInputOutput = (req, res, next) => {
  const keyword = req.query.keyword
  const results = req.results
  // 沒有輸入關鍵字提示使用者
  if (!results) return res.render('index', { keyword, results, style: 'main.css' })
  results.lean()
    .then(result => {
      // 這裡是將沒有找搜尋結果提示給使用者
      if (!result.length) {
        return res.render('index', {
          error: `<h5 class= "alert alert-warning text-center"> No Search results by keyword: "${keyword}" </h5>`
        })
      }
    }).catch(error => console.log(error))
}

module.exports = verifySearchInputOutput