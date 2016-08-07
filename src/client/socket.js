import Socket from 'engine.io-client'
import config from 'clientconfig'

const connection = new Socket(`${window.location.protocol}//${window.location.hostname}:${config.server.socket}/`)

const disconnectTimer = () => {
  let timer

  const start = () => {
    timer = setTimeout(() => window.location.reload(), 1000 * 60)
  }

  const stop = () => {
    clearTimeout(timer)
  }

  return {
    start, stop
  }
}

const timer = disconnectTimer()

timer.start()

export const onMessage = (cb) => {
  connection.on('message', (signal) => cb(JSON.parse(signal)))
}

export const onConnect = (cb) => {
  connection.on('open', () => {
    cb()
    timer.stop()
  })
}

export const onDisconnect = (cb) => {
  connection.on('close', () => {
    cb()
    timer.start()
  })
}

