const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  return Restaurant.find()
    .lean()
    .then(restaurants => {
      return res.render('index', { restaurants, style: 'main.css' })
    })
    .catch(error => console.log(error))
})

module.exports = router