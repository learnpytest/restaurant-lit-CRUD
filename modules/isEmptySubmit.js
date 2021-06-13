const isNotEmptySubmit = function (req, res) {
  const keyword = req.query.keyword
  if (keyword !== undefined) return keyword.length > 0
}
module.exports = isNotEmptySubmit