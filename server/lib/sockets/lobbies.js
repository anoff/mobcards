const WAITINGROOM = global.WAITINGROOM
const event = require('../sockets').event

module.exports = function (socket, ls) {
  return [
    event('startLobby', (playerId, emit) => {
      const id = ls.getFreeId()
      ls.addLobby(id)
      const payload = {add: [{id, count: 0, started: false}]}
      // tell all players in waiting room (including the one that sent the request)
      emit.lobby(WAITINGROOM, 'lobbies', payload)
    }),

    event('joinLobby', (playerId, emit, ctx) => {
      const {id: lobbyId} = ctx.data
      if (!ls.getLobby(lobbyId)) { // in case a non-existant lobby was opened via web link
        console.warn('someone is trying to join a non-existant lobby', {lobbyId, socket: playerId})
        emit.sender('lobbyNotFound', {lobbyId})
      } else {
        ls.removePlayer(playerId)
        ls.addPlayer(lobbyId, playerId, '')
        emit.all('lobbies', {status: ls.lobbies.filter(l => l.id !== WAITINGROOM).map(l => l.getStatus())}) // TODO: remove if count is not needed anymore
        emit.sender('lobbyJoined', {lobbyId})
        emit.sender('players', ls.getLobby(lobbyId).players)
      }
    }),
    event('browseLobbies', (playerId, emit, ctx) => {
      ls.removePlayer(playerId)
      ls.addPlayer(WAITINGROOM, playerId, '')
      const payload = {status: ls.lobbies.filter(l => l.id !== WAITINGROOM).map(l => l.getStatus())}
      emit.sender('lobbies', payload)
    })
  ]
}
