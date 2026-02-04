// Express App + Socket.IO inits
const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// Chat Client inits
const chat = require('./modules/chat')(io);

/**
 * Setup static directory
 *  and rendering engine
 *
 */
app.use(express.static('./public'))
app.set("view engine","ejs")
app.use(cors())


/**
 * Home Page
 *
 */
app.get('/', (req, res) => {
  res.render('home_page.ejs')
})


/**
 * Overlays
 *
 */
app.get('/overlay/cam-bg', (req, res) => {
  res.render('cam_bg.ejs')
})

app.get('/overlay/info-bar', (req, res) => {
  res.render('info_bar.ejs')
})

app.get('/overlay/tv-guide', (req, res) => {
  res.render('tv_guide.ejs')
})

app.get('/overlay/venom-coin',(req, res) => {
  res.render('venom_coin.ejs')
})

app.get('/overlay/info-bar-side', (req, res) => {
  res.render('info_bar_side.ejs')
})

app.get('/overlay/text-alert', (req, res) => {
  res.render('text_alert.ejs')
})

app.get('/overlay/chyron', (req, res) => {
  res.render('chyron.ejs')
})

app.get('/overlay/terminator', (req, res) => {
  res.render('terminator.ejs')
})

app.get('/overlay/knight-rider', (req, res) => {
  res.render('knight_rider.ejs')
})


/**
 * API Endpoints
 *
 */

app.post('/api/v1/text', express.json(), (req, res) => {
  io.emit('text-alert', { message: req.body.msg });
  res.sendStatus(200);
})

app.post('/api/v1/bg-alert', express.json(), (req, res) => {
  io.emit('bg-alert');
  res.sendStatus(200);
})

app.post('/api/v1/bg-random', express.json(), (req, res) => {
  io.emit('bg-random');
  res.sendStatus(200);
})

app.post('/api/v1/terminator', express.json(), (req, res) => {
  io.emit('terminator');
  res.sendStatus(200);
})


/**
 * 404 / All
 *
 */
app.all('*', (req, res) => {
  res.status(404).send('resource not found')
})


/**
 * Listen on port
 *
 */
server.listen(5000, async () => {
  console.log('server is listening on port 5000....')
})
