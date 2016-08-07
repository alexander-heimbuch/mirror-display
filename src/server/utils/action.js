import Bluebird from 'bluebird'
import merge from 'lodash/merge'

export default (action) => (data) => {
  if (Array.isArray(data)) {
    data = data.map((entry) => merge(entry, {type: action}))
  } else {
    data = merge(data, {type: action})
  }

  return Bluebird.resolve(data)
}
