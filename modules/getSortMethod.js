const getSortParam = function (sortOption) {
  switch (sortOption) {
    case 'name-asc':
      return { name_en: 'asc' };
    case 'name-desc':
      return { name_en: 'desc' };
    case 'rating-desc':
      return { rating: 'desc' };
    case 'rating-asc':
      return { rating: 'asc' };
    case 'category':
      return { category: 'asc' };
    case 'location':
      return { location: 'asc' };
    default:
      return false
  }
}
const getSortMethod = (req, res, next) => {
  const sortOption = req.query.sorting
  const sortMethod = getSortParam(sortOption)
  //如果sortMethod為true，更新req.flash('sortMethod)
  if (!sortOption) return next()
  if (sortMethod) {
    req.flash('sortMethod', sortMethod)
    req.flash('sortOption', sortOption)
  }
  const sortMethodOnFlash = req.flash('sortMethod')
  const sortOptionOnFlash = req.flash('sortOption')

  //在路由中使用req.sortMethod, req.sortOption
  req.sortMethod = sortMethodOnFlash[0]
  req.sortOption = sortOptionOnFlash[0]
  next()
}
module.exports = getSortMethod