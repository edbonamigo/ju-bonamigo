import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config()

import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'
import errorHandler from 'errorhandler'
import * as prismicH from '@prismicio/helpers'
import { keepNumbers } from './utils/sanitize.js'

const app = express()
const port = process.env.PORT

app.set('port', 3000)

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(methodOverride())

app.use(express.static(path.join(__dirname, 'public')))

app.use(errorHandler())

app.use((req, res, next) => {
  res.locals = {
    prismicH,
    keepNumbers,
  }
  next()
})

export default app
