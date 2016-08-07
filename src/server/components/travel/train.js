import Bluebird from 'bluebird'
import config from 'config'

import website from '../../utils/website'

const requestUrl = (start = '', destination = '') => {
  let now = new Date()
  let startDate = [now.getDate(), now.getMonth() + 1, now.getFullYear()].join('.')
  let startTime = [now.getHours(), now.getMinutes()].join(':')

  return `${config.get('travel.train.base')}${start}&REQ0JourneyStopsSID=&Z=${destination}&REQ0JourneyStopsZID=&date=${startDate}&time=${startTime}&timesel=depart`
}

export default () =>
  website(requestUrl(config.get('travel.train.start'), config.get('travel.train.destination')))
    .then(($) => {
      let results = []

      $('.result tbody.boxShadow').each((index, stop) => {
        results.push({
          start: $(stop).find('.time').first().text(),
          traffic: $(stop).find('.products').first().text().trim(),
          duration: $(stop).find('.duration').first().text().trim()
        })
      })

      return Bluebird.resolve(results)
    })
    .then((result) => Bluebird.resolve({
      id: 'train',
      times: result
    }))
