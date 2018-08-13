global.WAITINGROOM = -1
const server = require('server')
const path = require('path')
const { socket, error } = server.router
const { status, header } = server.reply
const ls = new (require('./lib/lobbystore'))()
const sockets = require('./lib/sockets')
const PORT = process.env.PORT || 80
const WAITINGROOM = global.WAITINGROOM // lobbyId of waiting room

const cors = [
  ctx => header('Access-Control-Allow-Origin', '*'),
  ctx => header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'),
  ctx => ctx.method.toLowerCase() === 'options' ? 200 : false
]
ls.addLobby(WAITINGROOM) // waiting room lobby
let context
// clean lobbystore
setInterval(() => {
  ls.lobbies.forEach(l => {
    if ((new Date() - l.updated) / 1000 > 10 && l.id !== WAITINGROOM && l.players.length === 0) {
      console.log('deleting old lobby', l.id)
      context.io.emit('lobbies', {remove: [{id: l.id}]})
      ls.removeLobby(l.id)
    }
    /* TODO: check if this is really required if disconnect is handled correctly
    l.players.forEach(p => {
      if ((new Date() - p.updated) / 1000 > 10) {
        console.log('deleting idle player', p.id)
        ls.removePlayer(p.id)
        context.io.sockets.sockets[p.id].emit('timeout', '')
        context.io.emit('lobbies', {status: ls.lobbies.filter(l => l.id !== WAITINGROOM).map(l => ({id: l.id, count: l.players.length}))}) // TODO: remove if count is not needed anymore
      }
    }) */
  })
}, 10000)

// Launch server with options and a couple of routes
sockets.load(socket, ls) // load socket definitions
server({ port: PORT, public: path.join(__dirname, '../client/dist') }, [
  cors,
  socket('connect', ctx => {
    console.log('client connected', ctx.socket.id)
    const playerId = ctx.socket.id
    ls.addPlayer(WAITINGROOM, playerId, 'unknown')
  }),
  socket('disconnect', ctx => {
    const playerId = ctx.socket.id
    console.log('client disconnected', ctx.socket.id)
    const lobbyId = ls.playerToLobby.get(playerId)
    ls.removePlayer(ctx.socket.id)
    ctx.io.emit('lobbies', {status: ls.lobbies.filter(l => l.id !== WAITINGROOM).map(l => l.getStatus())}) // TODO: remove if count is not needed anymore
    ls.getLobby(lobbyId).players.map(p => ctx.io.sockets.sockets[p.id]).filter(s => s).forEach(socket => socket.emit('players', ls.getLobby(lobbyId).players))
  }),
  // in a lobby
  socket('changeName', ctx => {
    const playerId = ctx.socket.id
    ls.setPlayerName(playerId, ctx.data.name)
    console.log(playerId, ctx.data.name)
    ctx.io.emit('lobbies', {status: ls.lobbies.filter(l => l.id !== WAITINGROOM).map(l => l.getStatus())}) // TODO: remove later
    const lobbyId = ls.playerToLobby.get(playerId)
    if (lobbyId) {
      ls.getLobby(lobbyId).players.map(p => ctx.io.sockets.sockets[p.id]).filter(s => s).forEach(socket => socket.emit('players', ls.getLobby(lobbyId).players))
    }
  }),
  socket('voteStart', ctx => {
    const {lobbyId, status} = ctx.data
    const playerId = ctx.socket.id
    console.log(playerId, lobbyId, status)
    ls.playerProceed(playerId, status)
    ls.getLobby(lobbyId).players.map(p => ctx.io.sockets.sockets[p.id]).filter(s => s).forEach(socket => socket.emit('players', ls.getLobby(lobbyId).players))
  }),
  socket('startGame', ctx => {
    const {lobbyId} = ctx.data
    ls.startGame(lobbyId)
  }),
  ctx => status(404).send('<h1>These are not the dom elements you are looking for</h1>'),
  error(ctx => status(500).send(ctx.error.message))
])
  .then(ctx => {
    context = ctx
  })
  .then(() => console.log(`Server started at http://localhost:${PORT}`))
