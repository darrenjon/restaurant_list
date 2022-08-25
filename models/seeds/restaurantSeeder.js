const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Restaurant = require('../restaurant')
const User = require('../user')

const db = require('../../config/mongoose')
const restaurantList = require('./restaurant.json').results
const SEED_USER = require('./seedUser.json').results

db.once('open', () => {
  Promise.all(
    Array.from(SEED_USER, (seedUser) => {
      return bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(seedUser.password, salt))
        .then((hash) =>
          User.create({
            name: seedUser.name,
            email: seedUser.email,
            password: hash,
          })
        )
        .then((user) => {
          const userId = user._id
          const seedRestaurant = []
          seedUser.restaurantIndex.forEach((index) => {
            restaurantList[index].userId = userId
            seedRestaurant.push(restaurantList[index])
          })
          return Restaurant.create(seedRestaurant)
        })
    })
  )
    .then(() => {
      console.log('done.')
      process.exit()
    })
})