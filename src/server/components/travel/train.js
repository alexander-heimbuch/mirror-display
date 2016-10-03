import Bluebird from 'bluebird'
import config from 'config'

import website from '../../utils/website'

const requestUrl = (start = '', destination = '') => {
  let now = new Date()
  let startDate = [now.getDate(), now.getMonth() + 1, now.getFullYear()].join('.')
  let startTime = [now.getHours(), now.getMinutes()].join(':')

  return `${config.get('travel.train.query')}${start}&REQ0JourneyStopsSID=&Z=${destination}&REQ0JourneyStopsZID=&date=${startDate}&time=${startTime}&timesel=depart`
}

export default () =>
  website(requestUrl(config.get('travel.start'), config.get('travel.destination')))
    .then(($) => {
      // Get link to more results page
      const later = $('a.later').attr('href')
      return Bluebird.resolve(`${config.get('travel.train.base')}${later}`)
    })
    .then(website)
    .then(($) => {
      const results = []

      $('.result tbody.boxShadow').each((index, stop) => {
        if (index > 5) {
          return;
        }

        results.push({
          start: $(stop).find('.time').first().text(),
          traffic: $(stop).find('.products').first().text().trim(),
          duration: $(stop).find('.duration').first().text().trim()
        })
      })

      return Bluebird.resolve(results)
    })
    .then((departures) => {
      let id = 1

      departures = departures.map((departure) => {
        departure.id = id++
        return departure
      })

      return Bluebird.resolve(departures)
    })
