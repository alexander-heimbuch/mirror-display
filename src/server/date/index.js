import Bluebird from 'bluebird'

export default (type) =>
  Bluebird.resolve({
    type: 'DATE_UPDATE',
    date: Date.now()
  })
