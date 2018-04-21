const GameStates = Object.freeze({ 'LOBBY_STARTING': 10, 'LOBBY_VOTING': 20, 'DISTRIBUTE_CARDS': 30, 'DISPLAY_QUESTION': 40, 'DISPLAY_ANSWERS': 50, 'DISPLAY_WINNER': 60 })
class LobbyStore {
  constructor () {
    this.Lobby = Lobby
    this.lobbies = []
  }

  addLobby (id) {
    const newLobby = new Lobby(id)
    this.lobbies.push(newLobby)
  }
  // return a unique ID for a new lobby
  getFreeId () {
    let id = Buffer.from((Date.now() % 10000).toString()).toString('base64').replace(/=/g, '').slice(-4)
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
}

class Lobby {
  constructor (id) {
    this.id = id
    this.players = []
    this.state = GameStates.LOBBY_STARTING
    this.updated = new Date()
  }

  addPlayer (name) {
    const p = new Player(name)
    this.players.push(p)
  }

  _update () {
    this.updated = new Date()
    return this
  }
}

class Player {
  constructor (name) {
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
