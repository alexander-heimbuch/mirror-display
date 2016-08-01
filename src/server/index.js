import express from 'express'
import path from 'path'
import Bluebird from 'bluebird'
import schedule from 'node-schedule'
import flatten from 'lodash/flatten'

import {startSocket, sendMessage} from './socket'
import weather from './weather'
import date from './date'

const errorHandler = (error) => {
  console.log(error)
}

// Server
const app = express()

app.use(express.static('dist/client'))

app.get('/', (req, res) => {
  res.sendfile(path.resolve('dist/client/index.html'))
})

app.listen(process.env.MIRROR_PORT || 3000)

const collectData = (action) =>
  Bluebird.join(weather(action), date(action))
    .then((result) =>
      Bluebird.resolve(flatten(result))
    )

// Startup => Send initial Data
collectData('ADD').then(startSocket)

// Heartbeat => Every Hour
schedule.scheduleJob('0 * * * *', () => collectData('UPDATE').then(sendMessage))
