const path = require('path')
const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const errorHandler = require('errorhandler')
const prismicH = require('@prismicio/helpers')
const { keepNumbers } = require('./app/utils/sanitize.js')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

app.set('port', process.env.CLIENT_PORT)

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(methodOverride())

app.use(express.static(path.join(__dirname, 'dist')))

app.use(errorHandler())

app.use((req, res, next) => {
  res.locals = {
    prismicH,
    keepNumbers,
  }
  next()
})

module.exports = app
