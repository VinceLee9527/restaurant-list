const express = require('express')
const app = express()
const port = 3000

//express-handlebars
const exphbs = require('express-handlebars')

//template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//reuiqre json file with restaurant info
const restaurantList = require('./restaurant.json')

//static file set
app.use(express.static('public'))

//render landing page handlebars
app.get('/', (req, res) => {
  res.render('index', { restaurant: restaurantList.results })
})

//using .filter to render search results. If search result empty, render emptyResult handlebars to display search empty message
app.get('/search', (req, res) => {
  const restaurants = restaurantList.results.filter((restaurant) => {
    return restaurant.name.toLowerCase().includes(req.query.keyword.trim().toLowerCase())
  })

  if (restaurants.length > 0) {
    res.render('index', { restaurant: restaurants, keyword: req.query.keyword.trim() })
  } else {
    res.render('emptyResult', { keyword: req.query.keyword })
  }
})

// render show page by fetching id fomr params
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})



app.listen(port, () => {
  console.log(`This server is now listening at localhost:${port}`)
})