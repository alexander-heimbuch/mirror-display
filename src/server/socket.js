import engine from 'engine.io'
import winston from 'winston'
import config from 'config'

const socket = engine.listen(config.get('server.socket'))

winston.info('Socket Server started on port %s', config.get('server.socket'))

const peers = []

const communicate = (socket) => (message = {}) => {
  winston.debug(message)
  socket.send(JSON.stringify(message))
}

export const sendMessage = (message = {}) => {
  Object.keys(peers).forEach((key) => {
    winston.debug('client [' + key + '] send message')
    communicate(peers[key])(message)
  })
}

export const onStart = (aggregator) => {
  socket.on('connection', (client) => {
    winston.debug('client [' + client.id + '] connected')

    peers[client.id] = client

    client.on('close', () => {
      peers[client.id] = null
      delete peers[client.id]
      winston.debug('client [' + client.id + '] left')
    })

    aggregator().each(communicate(client))
  })
}


