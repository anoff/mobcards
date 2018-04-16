<template>
  <div>
    <md-card v-for="card in cards" v-bind:key="card" >
    <md-card-media-actions md-solid>
      <md-card-media md-ratio="4:3">
        <img src="/assets/examples/villains.png" alt="card">
      </md-card-media>

      <md-card-area>
        <md-card-header>
          <span class="md-title">{{ card }}</span>
        </md-card-header>
      </md-card-area>

      <md-card-actions>
        <md-button class="md-icon-button md-raised md-primary">
          <md-icon>favorite</md-icon>
        </md-button>

        <md-button class="md-icon-button md-raised">
          <md-icon>share</md-icon>
        </md-button>
      </md-card-actions>
    </md-card-media-actions>
  </md-card>
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
.md-card {
  width: 320px;
  height: 240px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}
</style>
