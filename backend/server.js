const mongoose = require('mongoose')
const express = require('express')
const cookieSession = require('cookie-session')
const app = express()
const ApiRouter = require('./routes/api')
const AccountRouter = require('./routes/account')
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/test'
const path = require('path')
const socketIO = require('socket.io')
const http = require('http')
const isAuthenticated = require('./middlewares/isAuthenticated')

const server = http.createServer(app)
const io = socketIO(server)
const PORT = 3000

io.on('Connection', socket => {
  console.log('user connected')

  socket.on('disconnect', () => {
    console.log('User disconnected')
  })
})


const errorHandler = (err, req, res, next) => {
  if (err) {
    res.status(500)
    res.send('Bad Things Happened')
  }
    next()
}

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})


app.use(express.static('dist'))
app.use(express.json())

app.use(
  cookieSession({
    name: 'local-session',
    keys: ['HashingBasically'],
    maxAge: 24 * 60 * 60 * 1000 //24 hours worth of miliseconds
  })
)

app.post('/isAuthenticated', isAuthenticated, (req, res) => {
  res.json({ user: req.session.username })
})

app.use('/api', ApiRouter)
app.use('/account', AccountRouter)
app.use(errorHandler)

app.get('/favicon.ico', (_, res) => res.status(404).send())
app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

server.listen(PORT)