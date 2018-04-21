const server = require('server')
const lobby = new (require('./lib/lobbystore'))()
const { get, post, socket, error } = server.router
const { status, header } = server.reply
const PORT = process.env.PORT || 3000

const cors = [
  ctx => header('Access-Control-Allow-Origin', '*'),
  ctx => header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'),
  ctx => ctx.method.toLowerCase() === 'options' ? 200 : false
]

// clean lobbystore
setInterval(() => {
  lobby.lobbies.forEach(l => {
    l.players.forEach(p => {
      if ((new Date() - p.updated) > 10) {
        l.removePlayer(p.name)
      }
    })
  })
}, 10000)
// Launch server with options and a couple of routes
server({ port: PORT, public: './web/dist', security: { csrf: false } }, cors, [
  get('/lobby', ctx => lobby.lobbies),
  post('/lobby', ctx => {
    console.log(ctx.data)
    const playerName = ctx.data.name
    const id = lobby.getFreeId()
    lobby.addLobby(id)
    lobby.getLobby(id).addPlayer(playerName)
    return { id: lobby.getFreeId() }
  }),
  // Receive a message from a single socket
  socket('message', ctx => {
    // Send the message to every socket
    ctx.io.emit('message', ctx.data)
  }),
  socket('connect', ctx => {
    console.log('client connected', Object.keys(ctx.io.sockets.sockets))
    ctx.io.emit('count', {msg: 'HI U', count: ctx.io.sockets.sockets.length})
  }),
  socket('createLobby', ctx => {
    console.log(ctx)
  }),
  error(ctx => status(500).send(ctx.error.message))
])
  .then(() => console.log(`Server started at http://localhost:${PORT}`))
