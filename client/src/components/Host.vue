<template>
  <v-content>
    <v-btn
    absolute
    dark
    fab
    bottom
    right
    color="accent"
    class="bottom-float"
    @click="createLobby()"
    >
      <v-icon>add</v-icon>
    </v-btn>

    <v-list
      subheader
      three-line
    >
      <v-subheader>Active Lobbies</v-subheader>
      <v-list-tile
      v-for="l in lobbies"
      :key="l.id"
      >
        <v-list-tile-action>
          <v-btn
            @click="joinLobby(l.id, name)"
            icon
          >
          <v-icon>play_circle_outline</v-icon></v-btn>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ l.id }} ({{ l.count }}) started: {{ l.started }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-content>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Host',
  data: () => ({
    active: false,
    name: null,
    ids: [],
    lobbies: []
  }),
  mounted: function () {
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
      } else if (data.add) {
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bottom-float {
  margin-bottom: 3em;
}
</style>
