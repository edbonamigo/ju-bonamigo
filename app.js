import dotenv from 'dotenv'
dotenv.config()
const port = process.env.PORT

import app from './app-config.js'
import client from './app-client-config.js'

app.use(async (req, res, next) => {
  const meta = await client.getSingle('metadata')
  res.locals.defaults = { meta }

  next()
})

app.get('/', async (req, res) => {
  const home = await client.getSingle('home')
  const niches = await client.getAllByType('niche')

  res.render('pages/home', {
    ...res.locals.defaults,
    home,
    niches,
    random: Math.floor(Math.random() * home.data.images.length),
  })
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
  console.log(`--------> App listening at http://localhost:${port}`)
})
