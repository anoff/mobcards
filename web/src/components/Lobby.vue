<template>
  <div>
      <md-dialog-prompt
      :md-active.sync="nameChosen"
      v-model="name"
      md-title="Want to start a new lobby?"
      md-input-maxlength="30"
      md-input-placeholder="Type your name..."
      md-cancel-text="Exit"
      @md-cancel="nameCancel"
      md-confirm-text="Join"
      @md-confirm="nameConfirm" />

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
export default {
  name: 'Lobby',
  mounted () {
    this.$socket.emit('joinLobby', { id: this.lobbyId, })
  },
  data () {
    return {
      players: [ ],
      lobbyId: this.$route.params.id,
      nameChosen: true,
      name: ''
    }
  },
  methods: {
    nameConfirm () {
      
    },
    onVote (proceed) {
      console.log(this.players)
    },
    nameCancel () {
      this.$router.push({name: 'start'})
    }
  },
  props: []
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
