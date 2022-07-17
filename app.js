// require packages used in the project
const express = require('express')
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

const app = express()
const port = 3000

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/restaurants/:restaurantId', (req,res) => {
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