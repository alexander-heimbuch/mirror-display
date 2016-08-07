import Bluebird from 'bluebird'

export default () =>
  Bluebird.resolve({
    date: Date.now()
  })
