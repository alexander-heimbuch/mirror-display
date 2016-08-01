import Bluebird from 'bluebird'

import getWeather from './service'

import {normalizer, normalizeTime} from '../normalize'

const normalize = (data = []) => {
  const mapping = {
    time: 'time',
    temperature: 'temperature',
    precipProbability: 'percip',
    icon: 'short'
  }

  return Bluebird.resolve(data.map(normalizer(mapping)))
}

const filter = (hours = []) => (data) => {
  let filtrate = data.filter((entry) => hours.includes(entry.time))

  return Bluebird.resolve(filtrate)
}

const action = (type = 'ADD') => (entries = []) =>
  entries.map((entry) => {
    switch (type) {
      case 'ADD':
        entry.type = 'WEATHER_ADD'
        break
      case 'UPDATE':
        entry.type = 'WEATHER_UPDATE'
        break
    }

    return entry
  })

const identity = (data = []) =>
  data.map((entry) => {
    let date = new Date(entry.time)
    entry.id = date.getHours().toString()
    return entry
  })

export default (type) =>
  getWeather()
    .then(normalize)
    .then(filter([
      normalizeTime(undefined, 9),
      normalizeTime(undefined, 12),
      normalizeTime(undefined, 15)
    ]))
    .then(identity)
    .then(action(type))

