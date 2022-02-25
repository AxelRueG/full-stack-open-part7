const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')
require('express-async-errors')
const routerBlog = require('./routes/blog')
const routerUser = require('./routes/user')
const routerLogin = require('./routes/login')

const {requestLogger, unknownEndpoint, errorHandler, getTokenFrom} = require('./utils/middlewares')

// DB connection
let mongoUrl = process.env.DB_URI
if (process.env.NODE_ENV === 'test') mongoUrl = process.env.DB_TEST_URI
mongoose
  .connect(mongoUrl)
  .then(() => console.log('DB conected'))
  .catch(e => console.error(e))

// Middlewares
app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(getTokenFrom)

// EndPoints
app.use('/api/blogs', routerBlog)
app.use('/api/users', routerUser)
app.use('/api/login', routerLogin)

if (process.env.NODE_ENV === 'test'){
  const routerTest = require('./routes/test')
  app.use('/api/testing', routerTest)
}

// Error handles
app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app