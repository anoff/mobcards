<template>
  <v-content>
    <v-dialog
      v-model="promptName"
      persistent
    >
      <v-card>
        <v-card-title class="headline">Want to join the lobby?</v-card-title>
        <v-text-field
          v-model="name"
          label="Name"
          required
        ></v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat @click.native="nameCancel()">Cancel</v-btn>
          <v-btn color="green darken-1" flat @click.native="nameConfirm()">Join</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="timeout">
      <v-card>
        <v-card-title class="headline">Your session timed out</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click.native="onTimeoutConfirm()">Meh</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
    <v-dialog v-model="isStarting">
      <v-card>
        <v-card-title class="headline">Starting game..</v-card-title>
        <div>
          {{ timeRemaining }}
        </div>
      </v-card>
    </v-dialog>

    <v-list
      subheader
    >
    <v-subheader>Players in Lobby</v-subheader>
    <span v-on:dblclick="promptName = true">name: {{ name }}</span><br>
    <span>id: {{ lobbyId }}</span>
      <v-list-tile
      v-for="p in players"
      :key="p.id"
      >
        <v-list-tile-action>
          <v-btn
            @click="voteStart(p)"
            icon
            v-if="p.id === playerId"
          >
            <v-icon>{{ p.proceed ? 'check_box' : 'check_box_outline_blank'}}</v-icon>
          </v-btn>
          <v-icon v-else>{{ p.proceed ? 'check_box' : 'check_box_outline_blank'}}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ p.name }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-content>
</template>

<script>
import uuidv4 from 'uuid/v4'

export default {
  name: 'Lobby',
  mounted () {
    console.log('trying to join lobby', this.lobbyId)
    this.$socket.emit('joinLobby', {id: this.lobbyId})
  },
  computed: {
    isStarting () {
      return this.progress > 99
    }
  },
  data () {
    return {
      players: [ ],
      lobbyId: this.$route.params.id,
      promptName: false,
      timeout: false,
      name: localStorage.getItem('mobcards-name'),
      playerId: this.$socket.id,
      progress: 0,
      timeRemaining: 5
    }
  },
  methods: {
    nameConfirm () {
      this.$socket.emit('changeName', { playerId: this.playerId, name: this.name })
      localStorage.setItem('mobcards-name', this.name) // store so next session will instantiante with previous name
      sessionStorage.setItem('mobcards-name', this.name) // keep for active session so no more name popups occur
      this.promptName = false
    },
    onVote (proceed) {
      console.log(this.players)
    },
    nameCancel () {
      this.$router.push({name: 'start'})
    },
    onTimeoutConfirm() {
      this.$router.push({name: 'start'})
    },
    voteStart(player) {
      if (player.id === this.playerId) {
        this.$socket.emit('voteStart', {lobbyId: this.lobbyId, status: !player.proceed})
      }
    },
    countdown() {
      if (this.timeRemaining === 0) {
        this.startGame()
      } else {
        this.timeRemaining--
        setTimeout(this.countdown.bind(this), 1000)
      }
    },
    startGame() {
      this.$socket.emit('startGame', {id: this.lobbyId})
      this.$router.push({name: 'game', params: { id: this.lobbyId }})
    }
  },
  props: [],
  sockets: {
    connect () {
      console.log('connected to chat server')
      this.playerId = this.$socket.id
    },
    players (data) {
      this.players = data
      // update progress
      this.progress = data.filter(p => p.proceed).length / data.length * 100
      if (this.progress == 100) {
        setTimeout(() => this.countdown(), 1000)
      }
      // check if name prompt is required for this user
      const me = this.players.find(p => p.id === this.playerId)
      if (!me.name) {
        console.log(sessionStorage.getItem('mobcards-name'))
        if (sessionStorage.getItem('mobcards-name')) {
          this.name = sessionStorage.getItem('mobcards-name')
          this.$socket.emit('changeName', { name: this.name })
        } else {
          this.promptName = true
        }
      }
    },
    timeout (data) {
      console.log('TIMEOUT')
      this.timeout = true
    },
    lobbyNotFound () {
      this.$router.push({name: 'start'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
