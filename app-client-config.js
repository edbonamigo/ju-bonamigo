const fetch = require('node-fetch')
const prismic = require('@prismicio/client')
const dotenv = require('dotenv')
dotenv.config()

const repoName = process.env.PRISMIC_REPO_NAME
const accessToken = process.env.PRISMIC_ACCESS_TOKEN

// Prismic's Route Resolver.
const routes = []

const client = prismic.createClient(repoName, {
	fetch,
	accessToken,
	routes,
})

module.exports = client
