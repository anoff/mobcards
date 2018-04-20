<template>
  <div>
    <span>name: {{ name }}</span>
    <md-list>

      <md-divider class="md-inset"></md-divider>

      <md-list-item v-for="(status, p) in players" v-bind:key="p">
        <span class="md-list-item-text">{{ p }}</span>

        <md-button class="md-icon-button md-list-action">
          <md-icon class="md-primary">{{ status ? 'check_box' : 'check_box_outline_blank'}}</md-icon>
        </md-button>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
export default {
  name: 'Lobby',
  data () {
    return {
      players: {
        'blablup': false,
        'basdflkj': true,
        'moar': false
      }
    }
  },
  methods: {
    onVote (proceed) {
      console.log(this.players)
    },
    onCancel () {
      this.name = ''
    }
  },
  props: [
    'name'
  ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
