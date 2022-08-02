// require packages used in the project
const express = require('express')
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
const port = 3000
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

const Restaurant = require('./models/restaurant')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

// routes setting
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

app.get('/restaurants/:restaurantId', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id === Number(req.params.restaurantId))

  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
  const input = req.query.keyword
  const keyword = input.trim().toLowerCase()
  const restaurants = restaurantList.results.filter(restaurant =>
    restaurant.name.toLowerCase().includes(keyword) || restaurant.category.includes(keyword)
  )
  res.render('index', { restaurants: restaurants, keyword: input })
})


// start and listen on the Express server
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})