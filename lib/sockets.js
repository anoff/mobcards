let _socket
let _ls
function event (name, fn) {
  _socket(name, ctx => {
    const playerId = ctx.socket.id
    fn(playerId,
      {
        all: ctx.io.emit,
        sender: ctx.socket.emit,
        lobby: (lobbyId, eventName, eventData) => _ls.getLobby(lobbyId).players.map(p => ctx.io.sockets.sockets[p.id]).filter(s => s).forEach(socket => socket.emit(eventName, eventData)),
        id: (id, eventName, eventData) => ctx.io.sockets.sockets[id].emit(eventName, eventData)
      },
      ctx)
  })
}

module.exports = {
  load: (socket, ls) => {
    _socket = socket
    _ls = ls
    return [
      require('./sockets/lobbies')(socket, ls)
    ]
  },
  event
}
