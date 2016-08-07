import Bluebird from 'bluebird'
import config from 'config'

import website from '../../utils/website'

const base = config.get('travel.car.base')

const waypoints = config.get('travel.car.waypoints')

export default () =>
  website(`${base}${waypoints.join('/')}/data=!3m1!4b1!4m2!4m1!3e0?dg=dbrw&newdg=1`)
    .then(($) => {
      let results = []
      // let travelTime = content('.ml-directions-card-header-time-content').first().text().trim()
      $('.ml-directions-selection-screen-row').each((index, traffic) => {
        results.push({
          start: $(traffic).find('.ml-directions-selection-screen-non-transit-numbers-cell span').first().text().trim(),
          traffic: $(traffic).find('.ml-directions-selection-screen-non-transit-details-cell > span').first().text().trim()
        })
      })

      return Bluebird.resolve(results)
    })
    .then((result) => Bluebird.resolve({
      id: 'car',
      times: result
    }))
