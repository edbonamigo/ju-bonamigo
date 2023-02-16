const express = require('express')
const path = require('path')
const app = express()
const port = 3000

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('pages/home')
})

// página de ensaiors, ex ensaios/femininos ou ensaios/empresas
app.get('/ensaios', (req, res) => {
  res.render('pages/ensaios')
})

// página do ensaio, ex ensaio/janete ou ensaio/kallango
app.get('/ensaio', (req, res) => {
  res.render('pages/ensaio')
})

app.listen(port, () => {
  console.log(`Exemple app listening at http://localhost:${port}`)
})
