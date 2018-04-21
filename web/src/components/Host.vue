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
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Host',
  data: () => ({
    active: false,
    name: null
  }),
  methods: {
    onConfirm () {
      // get lobby ID
      axios.post(`${global.HOST}/lobby`)
      .then(id => {
        console.log(id)
        console.log(this.name)
        this.$router.push({name: 'lobby', params: {name: this.name }});
      })
    },
    onCancel () {
      this.name = ''
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
