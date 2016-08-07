import express from 'express'
import path from 'path'
import Bluebird from 'bluebird'
import schedule from 'node-schedule'
import flatten from 'lodash/flatten'
import winston from 'winston'
import config from 'config'

import {onStart, sendMessage} from './socket'
import setAction from './utils/action'
import weather from './components/weather'
import date from './components/date'
import quote from './components/quote'
import travel from './components/travel'

// Server
const app = express()
const errorHandler = (error) => winston.log(error)

app.use(express.static('dist/client'))

app.get('/', (req, res) => {
  res.cookie('config', JSON.stringify(config))
  res.sendFile(path.resolve('dist/client/client.html'))
})

app.listen(config.get('server.port'))

winston.info('Mirror Server started on port %s', config.get('server.port'))

// Startup => Send initial Data
onStart(() =>
  Bluebird.join(
      weather().then(setAction('WEATHER_ADD')),
      date().then(setAction('DATE_UPDATE')),
      quote().then(setAction('QUOTE_UPDATE')),
      travel().then(setAction('TRAVEL_ADD')))
    .then((result) =>
      Bluebird.resolve(flatten(result)))
    .catch(errorHandler)
)

// Heartbeat
// => update weather every hour
schedule.scheduleJob('0 * * * *', () =>
  weather()
    .then(setAction('WEATHER_UPDATE'))
    .each(sendMessage)
    .catch(errorHandler))

// => update date every minute
schedule.scheduleJob('* * * * *', () =>
  date()
    .then(setAction('DATE_UPDATE'))
    .then(sendMessage)
    .catch(errorHandler))

// => update travel every 30 minutes
schedule.scheduleJob('0,30 * * * *', () =>
  travel()
    .then(setAction('TRAVEL_UPDATE'))
    .each(sendMessage)
    .catch(errorHandler))

// => update quote once a day
schedule.scheduleJob('1 1 * * *', () =>
  quote()
    .then(setAction('QUOTE_UPDATE'))
    .then(sendMessage)
    .catch(errorHandler))
