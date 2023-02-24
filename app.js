import dotenv from 'dotenv'
dotenv.config()
const port = process.env.PORT

import app from './app-config.js'
import client from './app-client-config.js'

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
