const http = require('http')
const app = require('./app.js')
const Server = http.Server(app)

const PORT = 3003 || process.env.PORT
Server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})