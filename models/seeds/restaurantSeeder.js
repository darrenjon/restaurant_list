const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const db = require('../../config/mongoose')
const restaurantList = require('../../restaurant.json').results

db.once('open', () => {
  Restaurant.create(restaurantList)
    .then(() => {
      console.log('mongodb restaurantSeeder connected!')
    })
    .catch(error => console.log(error))
})
