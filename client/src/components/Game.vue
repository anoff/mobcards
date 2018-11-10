<template>
  <v-container>
    <div class="card-container">
    <vue-swing
      @throwout="throwout"
      @throwin="throwin"
      ref="wrapper"
      :config="swingConfig"
    >
      <v-card
      v-for="card in cards"
      v-bind:key="card.id"
      v-bind:style="{'z-index': card.id, 'margin-left': card.id*5 + 'px', 'margin-top': card.id*5 + 'px' }"
      :data-id="card.id"
      class="mobcard">
      <v-card-media>
        <v-container
          fill-height
          fluid
          pa-2
        >
          <v-layout fill-height>
            <v-flex xs12 align-end flexbox>
              <v-card-title md-solid>
                <span class="card-text" v-html="parseText(question, card.text)"></span>
              </v-card-title>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-media>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn icon large class="primary" @click="selected = card.id" v-bind:class="{ 'accent': selected == card.id }">
            <v-icon>star</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </vue-swing>
    </div>
  </v-container>
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
    thrownOut: [], // keep track of cards that have been removed from the pile
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
      const id = parseInt(data.target.getAttribute('data-id'))
      this.cards.find(c => c.id === id).thrown = true      

      if (this.cards.filter(c => !c.thrown).length === 0) {
        const cards = this.$refs.wrapper.cards
        let delay = 50
        cards.forEach(c => {
          const x = Math.floor(Math.random() * 800) - 400
          const y = Math.floor(Math.random() * 400) - 200
          setTimeout(() => c.throwIn(x, y), delay += 50)
        })
      }
    },
    throwin (data) {
      const id = parseInt(data.target.getAttribute('data-id'))
      this.cards.find(c => c.id === id).thrown = false
    }
  }
}
</script>

<style scoped>
.mobcard {
  border-radius: 2em;
  border-color: #f5f5f5;
  border-width: 2px;
  border-style: solid;
  background-color: black !important;
  max-width: 320px;
  min-height: 340px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
  top: 0;
  left: 0;
  position: absolute;
}
.card-text {
  color: white;
  font-size: 3em;
}
.card-container {
  position: relative;
  margin-top: 8em;
}
</style>
