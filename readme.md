# smartcards 📱🃏

> Play cards with your friends even if you didn't bring any 🚫 🃏 —  but everyone got a smartphone right? 📱

## description

A mobile first (maybe only) web application that lets you play cards against humanity with friends without having a deck of cards handy.
Although it works fully remote it is most fun if played in a IRL group.

Matchmaking is done via a serverless backend where clients are connected using a **session token** that gets shared from the host to its friends/players.

## usage

Run node server on port `3000` and webpack dev server on `8080` to develop both with hot reloading and open [localhost:8080](http://localhost:8080)

```sh
# start dev server 
npm run dev-server
# start webpack-dev-server in ./web directory
npm run dev-client
```

## game design

![usecase diagram](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.github.com/anoff/smartcards/master/assets/usecase.iuml)

> use cases and interactions

![state machine](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.github.com/anoff/smartcards/master/assets/state.iuml)

> game states

## socket events

All communication between clients and the server happens over websockets and is therefore eventbased. Clients fire an event and the reaction is triggered once the server responds. With high latencies this event driven approach _might_ feel unnatural.
Below is a list of events and senders (S) / receivers (R)

| event name | backend | host | player | description | payload |
|------------|---------|------|--------|-------------|---------|
| browseLobbies | R | S | S | players that are not in a lobby | |
| startLobby | R       | S    | -      | emitted when creating a lobby | |
| lobbies | S | R | (R*) | update to available lobbies | [lobbyId] |
| joinLobby | R | (S) | S | request to join a lobby (creator after reroute to player view) | |
| players | S | (R) | R | current players in a lobby, sent to all in a lobby | [players incl. vote status] |
| voteStart | R | - | S | player votes to start the game | {vote status} |

Payloads updates of type `Array` are always in the form of:

```javascript
{ add: [], remove [], status: [] }
```

where `add` is a list of players/votes/cards that were added, `remove` resources that have to be removed from local state and `status` is a complete update of the state that should overwrite local state.

## License

Cards taken from [crhallbergs collection of decks](https://github.com/crhallberg/json-against-humanity). The originals, his collection as well as all derivatives within this project are licensed under [CC BY-NC-SA 2.0](https://creativecommons.org/licenses/by-nc-sa/2.0/).

Any code in this project is licensed under [MIT](https://opensource.org/licenses/MIT)
