const verifySearchInputOutput = (req, res, next) => {
  const keyword = req.query.keyword
  const results = req.results
  results.lean()
    .then(results => {
      const length = results.length
      if (length) {
        req.hasResults = true
      }
      next()
    }).catch(error => console.log(error))
}
module.exports = verifySearchInputOutput