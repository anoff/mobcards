<template>
  <div>
  <md-dialog-prompt
      :md-active.sync="active"
      v-model="name"
      md-title="Want to start a new lobby?"
      md-input-maxlength="30"
      md-input-placeholder="Type your name..."
      md-confirm-text="Done"
      md-cancel-text="Cancel"
      @md-cancel="onCancel"
      @md-confirm="onConfirm" />

    <span v-if="name">name: {{ name }}</span>
    <md-button class="md-fab md-primary" v-on:click="active = true">
      <md-icon>add</md-icon>
    </md-button>

    <md-list>
      <md-list-item v-for="l in lobbies" v-bind:key="l.id">
        <span class="md-list-item-text">{{ l.id }} ({{ l.players.length }})</span>
        <md-button class="md-icon-button md-list-action">
          <md-icon>play_circle_outline</md-icon>
        </md-button>
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
    this.loadLobbies()
  },
  methods: {
    onConfirm () {
      // get lobby ID
      axios.post(`${global.HOST}/lobby`, { name: this.name })
      .then(id => {
        this.$router.push({name: 'lobby', params: {name: this.name }});
      })
    },
    onCancel () {
      this.name = ''
    },
    loadLobbies() {
      axios.get(`${global.HOST}/lobby`)
      .then(res => {
        const lobbies = res.data
        this.ids = lobbies.map(l => l.id)
        this.lobbies = lobbies
        lobbies.forEach(l => console.log(l.players))
      })
    }
  },
  sockets:{
    connect () {
      console.log('connected to chat server')
    },
    count (val) {
      this.count = val.count
    },
    message (data) { // this function gets triggered once a socket event of `message` is received
      this.textarea += data + '\n' // append each new message to the textarea and add a line break
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
