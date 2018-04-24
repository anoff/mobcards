<template>
  <div>
    <md-dialog-prompt
      :md-active.sync="nameChosen"
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
    <md-list>

      <md-divider class="md-inset"></md-divider>

      <md-list-item v-for="p in players" v-bind:key="p.name">
        <span class="md-list-item-text">{{ p.name }}</span>

        <md-button class="md-icon-button md-list-action">
          <md-icon class="md-primary">{{ p.proceed ? 'check_box' : 'check_box_outline_blank'}}</md-icon>
        </md-button>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
import uuidv4 from 'uuid/v4'

export default {
  name: 'Lobby',
  mounted () {
    
  },
  data () {
    return {
      players: [ ],
      lobbyId: this.$route.params.id,
      nameChosen: true,
      timeout: false,
      name: '',
      playerId: this.$socket.id
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
    }
  },
  props: [],
    sockets:{
    connect () {
      console.log('connected to chat server')
    },
    players (data) {
      this.players = data
    },
    timeout (data) {
      console.log('TIMEOUT')
      this.timeout = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
