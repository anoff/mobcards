const server = require('server')
const { get } = server.router
const { render } = server.reply

// Launch server with options and a couple of routes
server({ port: 8080 }, [
  get('/hello', ctx => 'Hello world'),
  get('/', ctx => render('../public'))
])
