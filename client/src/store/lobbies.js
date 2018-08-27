import Vue from 'vue'

export default {
  state: {
    lobbies: []
  },
  mutations: {
    setLobbies (state, lobbys) {
      state.lobbys = lobbys
    },
    addLobby (state, lobby) {
      Vue.set(state.lobbys, lobby.id, lobby)
    },
    exchangeLobby (state, lobby) {
      Vue.set(state.lobbys, lobby.id, lobby)
    },
    removeLobby (state, lobby) {
      Vue.delete(state.lobbys, lobby.id)
    }
  },
  actions: {
  },
  getters: {
    lobbies (state) {
      return state.lobbies
    }
  }
}

/**
this.$socket.emit('browseLobbies', '')
  },
  methods: {
    createLobby() {
      // get lobby ID
      console.log('CREATING')
      this.$socket.emit('startLobby', null)
    },
    joinLobby(id, name) {
      console.log('JOINING', id)
      this.$socket.emit('joinLobby', {id})
    }
  },
  sockets:{
    connect () {
      console.log('connected to chat server')
      console.log(this.$socket.id)
      this.$socket.emit('browseLobbies', '')
    },
    count (val) {
      this.count = val.count
    },
    message (data) { // this function gets triggered once a socket event of `message` is received
      this.textarea += data + '\n' // append each new message to the textarea and add a line break
    },
    lobbies (data) {
      if (data.status) {
        this.lobbies = data.status
      } else if (data.add) {
        data.add.forEach(lobby => this.lobbies.push(lobby))
      } else if (data.remove) {
        data.remove.forEach(r => {
          this.lobbies = this.lobbies.filter(l => r.id !== l.id)
        })
      }
    },
    lobbyJoined(data) {
      this.$router.push({name: 'lobby', params: { id: data.lobbyId }})
    }
  }
 */
