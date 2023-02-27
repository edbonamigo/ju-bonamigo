import dotenv from 'dotenv'
dotenv.config()
const port = process.env.PORT

import app from './app-config.js'
import client from './app-client-config.js'

app.use(async (req, res, next) => {
	const home = await client.getSingle('home')
	const meta = await client.getSingle('metadata')

	res.locals.defaults = {
		home,
		meta,
		random: Math.floor(Math.random() * home.data.images.length),
	}

	next()
})

app.get('/', async (req, res) => {
	const niches = await client.getAllByType('niche', {
		fetchLinks: 'photoshoot.title',
	})

	niches.forEach((niche) => {
		niche.data.photoshoots.forEach((photoshoot) => {
			photoshoot.title = photoshoot?.photoshoot?.data?.title
		})
	})

	res.render('pages/home', {
		...res.locals.defaults,
		niches,
	})
})

// página do ensaio, ex ensaio/janete ou ensaio/kallango
app.get('/:niche/:uid', async (req, res) => {
	const photoshoot = await client.getByUID('photoshoot', req.params.uid)
  const niche = await client.getByUID('niche', req.params.niche, {
		fetchLinks: 'photoshoot.uid',
	})
  let mainImage;

  niche.data.photoshoots.forEach(i => {
    if (i.photoshoot.data.uid == req.params.uid) {
      mainImage = i.image
    }
  })
  
  console.log(photoshoot.data.body[1])
  console.log(photoshoot.data.body[1].items[0])

	res.render('pages/photoshoot', {
		...res.locals.defaults,
    niche,
		photoshoot,
    mainImage
	})
})

app.listen(port, () => {
	console.log(`--------> App listening at http://localhost:${port}`)
})
