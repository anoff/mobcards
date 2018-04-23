const server = require('server')
const ls = new (require('./lib/lobbystore'))()
const { socket, error } = server.router
const { status, header } = server.reply
const PORT = process.env.PORT || 3000
const WAITINGROOM = -1 // lobbyId of waiting room
let context
const cors = [
  ctx => header('Access-Control-Allow-Origin', '*'),
  ctx => header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'),
  ctx => ctx.method.toLowerCase() === 'options' ? 200 : false
]

ls.addLobby(WAITINGROOM) // waiting room lobby
// clean lobbystore
setInterval(() => {
  ls.lobbies.forEach(l => {
    if ((new Date() - l.updated) / 1000 > 10 && l.id !== WAITINGROOM && l.players.length === 0) {
      console.log('deleting old lobby', l.id)
      context.io.emit('lobbies', {remove: [{id: l.id}]})
      ls.removeLobby(l.id)
    }
    l.players.forEach(p => {
      if ((new Date() - p.updated) / 1000 > 10) {
        console.log('deleting idle player', p.id)
        ls.removePlayer(p.id)
        context.io.emit('lobbies', {status: ls.lobbies.filter(l => l.id !== WAITINGROOM).map(l => ({id: l.id, count: l.players.length}))}) // TODO: remove if count is not needed anymore
      }
    })
  })
}, 10000)
// Launch server with options and a couple of routes
server({ port: PORT, public: './web/dist', security: { csrf: false } }, cors, [
  socket('connect', ctx => {
    console.log('client connected', ctx.socket.id)
    const playerId = ctx.socket.id
    ls.addPlayer(WAITINGROOM, playerId, 'unknown')
  }),
  socket('disconnect', ctx => {
    console.log('client disconnected', ctx.socket.id)
    ls.removePlayer(ctx.socket.id)
    ctx.io.emit('lobbies', {status: ls.lobbies.filter(l => l.id !== WAITINGROOM).map(l => ({id: l.id, count: l.players.length}))}) // TODO: remove if count is not needed anymore
  }),
  socket('startLobby', ctx => {
    const id = ls.getFreeId()
    ls.addLobby(id)
    const payload = {add: [{id, count: 0}]}
    // tell all players in waiting room (including the one that sent the request)
    ls.getLobby(WAITINGROOM).players.forEach(p => {
      const socket = ctx.io.sockets.sockets[p.id]
      if (socket) {
        socket.emit('lobbies', payload)
      } else {
        console.warn('Iterating over non-existant player in WAITINGROOM', p.id)
      }
    })
  }),
  socket('joinLobby', ctx => {
    const {id: lobbyId} = ctx.data
    const playerId = ctx.socket.id
    if (!ls.getLobby(lobbyId)) { // in case a non-existant lobby was opened via web link
      console.warn('someone is trying to join a non-existant lobby', {lobbyId, socket: ctx.socket.id})
    } else {
      ls.removePlayer(playerId)
      ls.addPlayer(lobbyId, playerId, '')
      ctx.io.emit('lobbies', {status: ls.lobbies.filter(l => l.id !== WAITINGROOM).map(l => ({id: l.id, count: l.players.length}))}) // TODO: remove if count is not needed anymore
    }
  }),
  socket('browseLobbies', ctx => {
    ctx.socket.emit('lobbies', {status: ls.lobbies.filter(l => l.id !== WAITINGROOM).map(l => ({id: l.id, count: l.players.length}))})
  }),
  socket('voteStart', ctx => {
  }),
  ctx => status(404).send('<h1>These are not the dom elements you are looking for</h1>'),
  error(ctx => status(500).send(ctx.error.message))
])
  .then(ctx => {
    context = ctx
  })
  .then(() => console.log(`Server started at http://localhost:${PORT}`))
