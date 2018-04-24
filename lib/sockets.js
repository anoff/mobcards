module.exports = function (socket, ls) {
  return [
    require('./sockets/lobbies')(socket, ls)
  ]
}
