<template>
  <div>
    <md-card v-for="card in cards" v-bind:key="card.id" >
    <md-card-media-actions md-solid>
        <md-card-area>
          <md-card-content>
            <span v-html="parseText(question, card.text)"></span>
          </md-card-content>
        </md-card-area>

      <md-card-actions>
        <md-button class="md-icon-button md-raised md-primary" @click="selected = card.id" v-bind:class="{ 'md-accent': selected == card.id }">
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
    cards: [{id: 0, text: 'funny'},
    {id: 1, text: 'funnier'},
    {id: 2, text: 'LOL'}],
    question: "a clown with a red nose is _",
    selected: null
  }),
  methods: {
    parseText: (q, a) => q.replace('_', `<u><b>${a}</b></u>`)
  }
}
</script>

<style scoped>
.md-card {
  border-radius: 2em;
  background-color: black;
  width: 320px;
  height: 240px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}
.md-card-content {
  color: white;
  font-size: 1.8em;
}
</style>
