const weather = (state = {}, action) => {
  if (action.type === 'WEATHER_UPDATE' && state.id !== action.id) {
    return state
  }

  let delta = Object.assign({}, state, action)

  return Object.keys(delta).reduce((result, key) => {
    if (key !== 'type') {
      result[key] = delta[key]
    }
    return result
  }, {})
}

const weatherBoard = (state = [], action) => {
  switch (action.type) {
    case 'WEATHER_ADD':
      return [
        ...state,
        weather(undefined, action)
      ]
    case 'WEATHER_UPDATE':
      return state.map((entry) => weather(entry, action))
    default:
      return state
  }
}

export default weatherBoard

// ADD WEATHER
// UPDATE WEATHER
