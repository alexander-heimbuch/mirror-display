import Bluebird from 'Bluebird'

export const normalizer = (mapping) => (data) => {
  let normalized = Object.keys(mapping).reduce((result, key) => {
    result[mapping[key]] = data[key]
    return result
  }, {})

  return normalized
}

export const normalizeTime = (time = new Date(), hours = 0) => {
  time.setHours(hours)
  time.setMinutes(0)
  time.setSeconds(0)
  time.setMilliseconds(0)

  return time.getTime()
}
