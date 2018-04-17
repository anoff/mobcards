const server = require('server')
const { get, socket } = server.router
const PORT = process.env.PORT || 3000

// Launch server with options and a couple of routes
server({ port: PORT, public: './web/dist' }, [
  get('/hello', ctx => 'Hello world'),
  // Receive a message from a single socket
  socket('message', ctx => {
    // Send the message to every socket
    ctx.io.emit('message', ctx.data)
  }),
  socket('connect', ctx => {
    console.log('client connected', Object.keys(ctx.io.sockets.sockets))
    ctx.io.emit('count', {msg: 'HI U', count: ctx.io.sockets.sockets.length})
  })
])
  .then(() => console.log(`Server started at http://localhost:${PORT}`))
