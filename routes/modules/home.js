const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const userId = req.user._id
  const sort = req.query.sort
  const sortOption = {
    aSort: { name: 'asc' },
    zSort: { name: 'desc' },
    category: { category: 'asc' },
    location: { location: 'asc' }
  }
  Restaurant.find({ userId })
    .lean()
    .sort(sortOption[sort])
    .then(restaurants => res.render('index', { restaurants, sort }))
    .catch(error => console.log(error))
})

// search restaurant list
router.get('/search', (req, res) => {
  const userId = req.user._id
  const input = req.query.keyword
  const keyword = input.trim().toLowerCase()
  Restaurant.find({ userId })
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
