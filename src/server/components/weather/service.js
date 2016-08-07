import Forecast from 'forecast.io-bluebird'
import Bluebird from 'bluebird'
import config from 'config'

import {normalizeTime} from '../../utils/normalize'

const forecast = new Forecast({
  key: config.get('weather.api_key'),
  timeout: config.get('weather.timeout')
})

const options = {
  'units': 'si'
}

const hours = (time = normalizeTime(time, 0)) =>
  forecast.fetch(config.get('weather.lat'), config.get('weather.long'), time, options)
    .then((result) => {
      // convert to js miliseconds
      let data = result.hourly.data.map((item) => {
        item.time = item.time * 1000
        return item
      })

      return Bluebird.resolve(data)
    })

export default hours
