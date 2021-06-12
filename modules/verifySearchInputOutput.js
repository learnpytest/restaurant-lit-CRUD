const verifySearchInputOutput = (req, res, next) => {
  const results = req.results
  results.lean()
    .then(results => {
      req.hasResults = results.length > 0 ? true : false
      next()
    }).catch(error => console.log(error))
}
module.exports = verifySearchInputOutput