/*
    Forecast.io Service
 */
import Forecast from 'forecast.io-bluebird'
import Bluebird from 'bluebird'

import {normalizeTime} from '../normalize'

import config from '../config.json'

const forecast = new Forecast({
  key: '02f5985fb338fe21d4764e81067eb374',
  timeout: 2500
})

const hours = (time = normalizeTime(time, 0)) =>
  forecast.fetch(config.service.lat, config.service.long, time, config.service.options)
    .then((result) => {
      // convert to js miliseconds
      let data = result.hourly.data.map((item) => {
        item.time = item.time * 1000
        return item
      })

      return Bluebird.resolve(data)
    })

export default hours
