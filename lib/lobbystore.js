const GameStates = Object.freeze({ 'LOBBY_STARTING': 10, 'LOBBY_VOTING': 20, 'DISTRIBUTE_CARDS': 30, 'DISPLAY_QUESTION': 40, 'DISPLAY_ANSWERS': 50, 'DISPLAY_WINNER': 60 })
class LobbyStore {
  constructor () {
    this.Lobby = Lobby
    this.lobbies = []
    this.playerToLobby = new Map()
  }

  addLobby (id) {
    const newLobby = new Lobby(id)
    this.lobbies.push(newLobby)
  }
  // return a unique ID for a new lobby
  getFreeId () {
    let id = Buffer.from((Date.now() % 10000).toString()).toString('base64').replace(/=/g, '').slice(-4).toUpperCase()
    if (id.length !== 4) {
      id = this.getFreeId()
    } else if (this.lobbies.find(l => l.id === id)) {
      id = this.getFreeId()
    }
    return id
  }
  getIds () {
    return this.lobbies.map(l => l.id)
  }
  getLobby (id) {
    return this.lobbies.find(l => l.id === id)
  }
  addPlayer (lobbyId, playerId, playerName) {
    const l = this.lobbies.find(l => l.id === lobbyId)
    if (l) {
      l.addPlayer(playerId, playerName)
      this.playerToLobby.set(playerId, lobbyId)
    }
  }
  // remove player from lobby he is in
  removePlayer (playerId) {
    this.lobbies.forEach(lobby => lobby.removePlayer(playerId))
    this.playerToLobby.delete(playerId)
  }
  removeLobby (id) {
    this.lobbies = this.lobbies.filter(l => l.id !== id)
  }
  setPlayerName (playerId, name) {
    const lobby = this.lobbies.find(l => l.id === this.playerToLobby.get(playerId))
    if (lobby) {
      const player = lobby.players.find(p => p.id === playerId)
      if (player) {
        player.name = name
        player._update()
        lobby._update()
      }
    }
  }
}

class Lobby {
  constructor (id) {
    this.id = id
    this.players = []
    this.state = GameStates.LOBBY_STARTING
    this.updated = new Date()
  }

  addPlayer (id, name) {
    const p = new Player(id, name)
    this.players.push(p)
  }

  _update () {
    this.updated = new Date()
    return this
  }

  removePlayer (id) {
    this.players = this.players.filter(p => p.id !== id)
  }
}

class Player {
  constructor (id, name) {
    this.id = id // == socket.id
    this.name = name
    this.startGame = false
    this.cards = []
    this.updated = new Date()
  }

  _update () {
    this.updated = new Date()
    return this
  }
}

module.exports = LobbyStore
