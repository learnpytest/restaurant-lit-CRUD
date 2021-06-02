const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.send('This is restaurant list CRUD')
})

app.listen(port, () => {
  console.log(`The server is running on https://localhost:${port}`)
})