import engine from 'engine.io'

const socket = engine.listen(process.env.MIRROR_SOCKET_PORT || 3001)

const peers = []

const intercom = (socket) => (message = {}) => {
  socket.send(JSON.stringify(message))
}

const sendAll = (message = {}) => {
  Object.keys(peers).forEach((key) => {
    console.log('client [' + key + '] send message')
    intercom(peers[key])(message)
  })
}

export const sendMessage = (messages = []) => messages.forEach(sendAll)

export const onStart = (messages = []) => {
  socket.on('connection', (client) => {
    const channel = intercom(client)

    console.log('client [' + client.id + '] connected')

    peers[client.id] = client

    client.on('close', () => {
      peers[client.id] = null
      delete peers[client.id]
      console.log('client [' + client.id + '] left')
    })

    messages.forEach(channel)
  })
}
