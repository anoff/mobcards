<template>
  <div class="card-container">
  <vue-swing
    @throwout="throwout"
    @throwin="throwin"
    ref="wrapper"
    :config="swingConfig"
  >
    <md-card v-for="card in cards" v-bind:key="card.id" v-bind:style="{'z-index': card.id, 'margin-left': card.id*5 + 'px', 'margin-top': card.id*5 + 'px' }">
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
    {id: 2, text: 'LOL'},
    {id: 3, text: 'hilarious'},
    {id: 4, text: 'sad'}],
    question: "a clown with a red nose is _",
    selected: null,
    throwCount: 0,
    swingConfig: {
      minThrowOutDistance: 400,
      maxThrowOutDistance: 600,
      throwOutConfidence (x, y) {
        const dist2 = x*x + y*y
        return Math.min(1, dist2/6000)
      }
    }
  }),
  methods: {
    parseText: (q, a) => q.replace('_', `<u><b>${a}</b></u>`),
    throwout (data) {
      this.throwCount++
      if(this.throwCount >= this.cards.length) {
        const cards = this.$refs.wrapper.cards
        let delay = 10
        cards.forEach(c => {
          const x = Math.floor(Math.random() * 800) - 400
          const y = Math.floor(Math.random() * 400) - 200
          setTimeout(() => c.throwIn(x, y), delay += 10)
        })
        this.throwCount = 0
      }
    },
    throwin (data) {
      this.throwCount--
    }
  }
}
</script>

<style scoped>
.md-card {
  border-radius: 2em;
  border-color: #f5f5f5;
  border-width: 2px;
  border-style: solid;
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
