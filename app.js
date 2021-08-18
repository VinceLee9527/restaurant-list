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

app.get('/', (req, res) => {
  res.render('index', { restaurant: restaurantList.results })
})

app.get('/search', (req, res) => {
  const restaurants = restaurantList.results.filter((restaurant) => {
    return restaurant.name.toLowerCase().includes(req.query.keyword.trim().toLowerCase())
  })

  res.render('index', { restaurant: restaurants, keyword: req.query.keyword.trim() })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})



app.listen(port, () => {
  console.log(`This server is now listening at localhost:${port}`)
})