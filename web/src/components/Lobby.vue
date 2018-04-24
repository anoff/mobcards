<template>
  <div>
    <md-dialog-prompt
      :md-active.sync="promptName"
      v-model="name"
      md-title="Want to join the lobby?"
      md-input-maxlength="30"
      md-input-placeholder="Type your name..."
      md-autofocus
      md-cancel-text="Exit"
      @md-cancel="nameCancel"
      md-confirm-text="Join"
      @md-confirm="nameConfirm" />

    <md-dialog :md-active.sync="timeout">
      <md-dialog-title>Your session timed out</md-dialog-title>
      <md-dialog-actions>
        <md-button class="md-primary" @click="onTimeoutConfirm">Meh</md-button>
      </md-dialog-actions>
    </md-dialog>
    
    <span>name: {{ name }}</span><br>
    <span>id: {{ lobbyId }}</span>
    <md-progress-bar md-mode="determinate" :md-value="progress"></md-progress-bar>
    <md-list>

      <md-divider class="md-inset"></md-divider>

      <md-list-item v-for="p in players" v-bind:key="p.id">
        <span class="md-list-item-text">{{ p.name }}</span>

        <md-button class="md-icon-button md-list-action md-primary" v-on:click="voteStart(p)" v-if="p.id === playerId">
          <md-icon class="md-primary">{{ p.proceed ? 'check_box' : 'check_box_outline_blank'}}</md-icon>
        </md-button>
        <md-icon class="" v-else>{{ p.proceed ? 'check_box' : 'check_box_outline_blank'}}</md-icon>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
import uuidv4 from 'uuid/v4'

export default {
  name: 'Lobby',
  mounted () {
    this.$socket.emit('joinLobby', {id: this.lobbyId})
  },
  data () {
    return {
      players: [ ],
      lobbyId: this.$route.params.id,
      promptName: false,
      timeout: false,
      name: '',
      playerId: this.$socket.id,
      progress: 0
    }
  },
  methods: {
    nameConfirm () {
      this.$socket.emit('changeName', { playerId: this.playerId, name: this.name })
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
    }
  },
  props: [],
  sockets: {
    connect () {
      console.log('connected to chat server')
    },
    players (data) {
      this.players = data
      // update progress
      this.progress = data.filter(p => p.proceed).length / data.length * 100
      // TODO: when 100% is reached start game
      // check if name prompt is required for this user
      const me = this.players.find(p => p.id === this.playerId)
      console.log(me.id)
      this.promptName = !me.name
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
