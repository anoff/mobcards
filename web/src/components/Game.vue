<template>
  <div class="card-container">
  <vue-swing
    @throwout="throwout"
    @throwin="throwin"
  >
    <md-card v-for="card in cards" v-bind:key="card.id" v-if="visibleCards.indexOf(card.id) > -1">
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
  </vue-swing>
  </div>
</template>

<script>
export default {
  name: 'Game',
  data: () => ({
    cards: [{id: 0, text: 'funny'},
    {id: 1, text: 'funnier'},
    {id: 2, text: 'LOL'}],
    question: "a clown with a red nose is _",
    selected: null,
    visibleCards: [0, 1]
  }),
  methods: {
    parseText: (q, a) => q.replace('_', `<u><b>${a}</b></u>`),
    throwout (data) {
      this.visibleCards[0]++
      this.visibleCards[1]++

      if (this.visibleCards[0] > 2) {
        this.visibleCards[0] = 0
      }
      if (this.visibleCards[1] > 2) {
        this.visibleCards[1] = 0
      }
      console.log(this.visibleCards, data)
    },
    throwin (data) {
      console.log(data, 'in')
    }
  }
}
</script>

<style scoped>
.md-card {
  border-radius: 2em;
  background-color: black;
  max-width: 320px;
  width: 100%;
  height: 240px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
  top: 0;
  left: 0;
  position: absolute;
}
.md-card-content {
  color: white;
  font-size: 2em;
}
.card-container {
  position: relative;
}
</style>
