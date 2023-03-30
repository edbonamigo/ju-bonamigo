const app = require('./app-config.js')
const client = require('./app-client-config.js')
const dotenv = require('dotenv')
dotenv.config()

const port = process.env.PORT

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

app.get('/:niche', async (req, res) => {
	const uid = req.params.niche
	const content = await client.getByUID('niche', uid, {
		fetchLinks: 'photoshoot.title',
	})

	res.render('pages/niche', {
		...res.locals.defaults,
		content,
		uid,
	})
})

app.get('/:niche/:uid', async (req, res) => {
	const [photoshoot, niche] = await Promise.all([
		client.getByUID('photoshoot', req.params.uid),
		client.getByUID('niche', req.params.niche, {
			fetchLinks: 'photoshoot.uid',
		}),
	])

	let mainImage

	niche.data.photoshoots.forEach((i) => {
		if (i.photoshoot.data.uid == req.params.uid) {
			mainImage = i.image
		}
	})

	res.render('pages/photoshoot', {
		...res.locals.defaults,
		niche,
		photoshoot,
		mainImage,
	})
})

app.listen(port, () => {
	console.log(`--------> App listening at http://localhost:${port}`)
})
