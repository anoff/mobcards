#!/usr/bin/env node
// parse into custom format
const fs = require('fs')
const SOURCE = './json-against-humanity/full.md.json'
const TARGET = './cards.json'

const cardsRaw = require(SOURCE)

const cards = {
  sets: cardsRaw.metadata
}

console.log('source length:', cardsRaw.white.length + cardsRaw.black.length)

Object.keys(cards.sets).forEach(s => {
  const c = cardsRaw.black
    .filter(e => e.deck.toLocaleLowerCase() === s.toLocaleLowerCase())
    .map(e => {
      return {
        color: 'b',
        text: e.text
      }
    })
    .concat(
      cardsRaw.white
        .filter(e => e.deck.toLocaleLowerCase() === s.toLocaleLowerCase())
        .map(e => {
          return {
            color: 'w',
            text: e.text
          }
        })
    )
  cards[s] = c
})

console.log('new length:', Object.keys(cards.sets).map(s => cards[s].length).reduce((p, c) => p + c, 0))
fs.writeFileSync(TARGET, JSON.stringify(cards, null, 2), 'utf8')
