const app = require('./app-config.js')
const client = require('./app-client-config.js')
const dotenv = require('dotenv')
dotenv.config()

const port = process.env.CLIENT_PORT

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.use(async (req, res, next) => {
  const [home, meta] = await Promise.all([
    client.getSingle('home'),
    client.getSingle('metadata'),
  ])

  res.locals.defaults = {
    home,
    meta,
    random: Math.floor(Math.random() * home.data.home_images.length),
  }

  next()
})

app.get('/', async (req, res) => {
  const niches = await client.getAllByType('niche', {})
  let images = []
  let nichesData = []

  niches.forEach(niche => {
    images = niche.data.images_home.map(item => item.image);
    //makes the main image the second of the array
    images.splice(1, 0, niche.data.image)

    niche.images = images
    nichesData.push(niche)
  })

  res.render('pages/home', {
    ...res.locals.defaults,
    nichesData,
  })
})

app.get('/:niche', async (req, res) => {
  const uid = req.params.niche
  const niche = await client.getByUID('niche', uid)

  res.render('pages/photoshoot', {
    ...res.locals.defaults,
    niche,
    uid,
  })
})

app.listen(port, () => {
  console.log(`--------> App listening at http://localhost:${port}`)
})
