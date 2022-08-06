const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

//search restaurant list
router.get('/search', (req, res) => {
  const input = req.query.keyword
  const keyword = input.trim().toLowerCase()
  Restaurant.find()
    .lean()
    .then(restaurants => {
      const searchList = restaurants.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(keyword) ||
          restaurant.name_en.includes(keyword) ||
          restaurant.category.includes(keyword)
      })
      res.render('index', { restaurants: searchList, keyword: input })
    })
    .catch(error => console.log(error))
})

module.exports = router