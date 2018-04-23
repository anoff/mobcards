const server = require('server')
const ls = new (require('./lib/lobbystore'))()
const { get, post, socket, error } = server.router
const { status, header } = server.reply
const PORT = process.env.PORT || 3000
const WAITINGROOM = -1 // lobbyId of waiting room
const cors = [
  ctx => header('Access-Control-Allow-Origin', '*'),
  ctx => header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'),
  ctx => ctx.method.toLowerCase() === 'options' ? 200 : false
]

ls.addLobby(WAITINGROOM) // waiting room lobby
// clean lobbystore
setInterval(() => {
  ls.lobbies.forEach(l => {
    l.players.forEach(p => {
      if ((new Date() - p.updated) > 10) {
        l.removePlayer(p.name)
      }
    })
    if ((new Date() - l.updated) > 10) {
      console.log('deleting old lobby', l.id)
    }
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
    const {id, playerId, name: playerName} = ctx.data
    let l = ls.getLobby(id)
    console.log(l)
    if (!l) { // in case a non-existant lobby was opened via web link
      console.log('creating lobby', l)
      ls.addLobby(id)
      l = ls.getLobby(id)
    }
    l.addPlayer(ctx.socket.id, playerId, playerName)
    const players = l.players
    console.log(players)
    l.players.map(p => p.socketId).forEach(s => ctx.io.sockets.sockets[s].emit('lobbyUpdate', players))
  }),
  socket('browseLobbies', ctx => {
    ctx.socket.emit('lobbies', {status: ls.lobbies.filter(l => l.id !== WAITINGROOM).map(l => ({id: l.id, count: l.players.length}))})
  }),
  socket('voteStart', ctx => {
  }),
  ctx => status(404).send('<h1>These are not the dom elements you are looking for</h1>'),
  error(ctx => status(500).send(ctx.error.message))
])
  .then(() => console.log(`Server started at http://localhost:${PORT}`))
