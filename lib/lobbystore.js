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
}

class Lobby {
  constructor (id) {
    this.id = id
    this.players = []
    this.state = GameStates.LOBBY_STARTING
  }

  addPlayer (name) {
    const p = new Player(name)
    this.players.push(p)
  }
}

class Player {
  constructor (name) {
    this.name = name
    this.startGame = false
    this.cards = []
  }
}

module.exports = LobbyStore
