<template>
  <div>
    <md-button class="md-fab md-primary" v-on:click="createLobby()">
      <md-icon>add</md-icon>
    </md-button>

    <md-list>
      <md-subheader>Lobbies</md-subheader>
      <md-list-item v-for="l in lobbies" v-bind:key="l.id">
        <md-button class="md-icon-button md-list-action" v-on:click="joinLobby(l.id, name)">
          <md-icon>play_circle_outline</md-icon>
        </md-button>
        <span class="md-list-item-text">{{ l.id }} ({{ l.count }})</span>
      </md-list-item>
    </md-list>
  </div>
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
      this.$socket.emit('startLobby', null)
    },
    joinLobby(id, name) {
      console.log(id)
      this.$router.push({name: 'lobby', params: { id }})
    },
    loadLobbies() {
      axios.get(`${global.HOST}/lobby`)
      .then(res => {
        const lobbies = res.data
        this.ids = lobbies.map(l => l.id)
        this.lobbies = lobbies
      })
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
        data.remove.map(r => r.id).forEach(r => {
          const ix = this.lobbies.findIndex(l => r.id === l.id)
          if (ix > -1) {
            this.lobbies.slice(ix, ix)
          }
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.full-control > .md-list {
  width: 320px;
  max-width: 100%;
  height: 400px;
  display: inline-block;
  overflow: auto;
  border: 1px solid rgba(#000, .12);
  vertical-align: top;
}
.md-list-item-content .md-list-action {
  margin: 0 5px 0 0;
}
</style>
