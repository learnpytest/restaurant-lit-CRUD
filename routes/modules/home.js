const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.use((req, res) => {
  const sortOption = req.query.sorting
  return Restaurant.find()
    .lean()
    .sort(req.sortMethod)
    .then(restaurants => {
      return res.render('index', { restaurants, sortOption, style: 'main.css' })
    })
    .catch(error => console.log(error))
})
module.exports = router