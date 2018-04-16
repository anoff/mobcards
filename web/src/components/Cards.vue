<template>
  <div>
    <md-steppers md-alternative>
      <md-step v-for="card in cards" v-bind:key="$index" v-bind:md-label="card">
        {{ card }}
      </md-step>
    </md-steppers>
  </div>
</template>

<script>
export default {
  name: 'Cards',
  data: () => ({
    cards: ['funny', 'funnier', 'LOL']
  })
}
</script>

<style scoped>
</style>
