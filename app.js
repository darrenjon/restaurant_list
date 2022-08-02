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

// add restaurant
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

app.post('/restaurants', (req, res) => {
  const body = req.body
  return Restaurant.create(body)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// add read more details of restaurant
app.get('/restaurants/:restaurantId', (req, res) => {
  const id = req.params.restaurantId
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(err => console.log(err))
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