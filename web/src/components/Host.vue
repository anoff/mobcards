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
export default {
  name: 'Host',
  data: () => ({
    active: false,
    name: null
  }),
  methods: {
    onConfirm () {
      // get lobby ID
      this.$router.push({path: 'lobby', params: {name: this.name }});
    },
    onCancel () {
      this.name = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
