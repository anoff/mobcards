const WAITINGROOM = global.WAITINGROOM
module.exports = function (socket, ls) {
  return [
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
        ctx.socket.emit('lobbyNotFound', {lobbyId})
      } else {
        ls.removePlayer(playerId)
        ls.addPlayer(lobbyId, playerId, '')
        ctx.io.emit('lobbies', {status: ls.lobbies.filter(l => l.id !== WAITINGROOM).map(l => ({id: l.id, count: l.players.length}))}) // TODO: remove if count is not needed anymore
        ctx.socket.emit('lobbyJoined', {lobbyId})
        ctx.socket.emit('players', ls.getLobby(lobbyId).players)
      }
    }),
    socket('browseLobbies', ctx => {
      const playerId = ctx.socket.id
      ls.removePlayer(playerId)
      ls.addPlayer(WAITINGROOM, playerId, '')
      ctx.socket.emit('lobbies', {status: ls.lobbies.filter(l => l.id !== WAITINGROOM).map(l => ({id: l.id, count: l.players.length}))})
    })
  ]
}
