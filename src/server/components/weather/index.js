import Bluebird from 'bluebird'

import getWeather from './service'

import {normalizer, normalizeTime} from '../../utils/normalize'

const normalize = (data = []) => {
  const mapping = {
    time: 'time',
    temperature: 'temperature',
    precipProbability: 'percip',
    icon: 'short'
  }

  return Bluebird.resolve(data.map(normalizer(mapping)))
}

const filterTime = (hours = []) => (data) => {
  let filtrate = data.filter((entry) => hours.includes(entry.time))

  return Bluebird.resolve(filtrate)
}

const identity = (data = []) =>
  data.map((entry, id) => {
    let date = new Date(entry.time)
    entry.id = id
    entry.temperature = Number((entry.temperature).toFixed(1))
    entry.percip = Number(entry.percip * 100).toFixed(0)
    return entry
  })

const filter = (now) => {
	let times = []

	if (now < 12) {
		times = [9, 12, 18]
	}

	if (now > 12 && now < 15) {
		times = [12, 15, 21]
	}

	if (now > 15) {
		times = [15, 18, 23]
	}

	return times.map((time) => normalizeTime(undefined, time))
}

export default (type) =>
  getWeather()
    .then(normalize)
    .then(filterTime(filter(new Date().getHours())))
    .then(identity)

