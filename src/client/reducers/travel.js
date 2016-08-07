const travel = (state = {}, action) => {
  if (action.type === 'TRAVEL_UPDATE' && state.id !== action.id) {
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

const travelBoard = (state = [], action) => {
  switch (action.type) {
    case 'TRAVEL_ADD':
      return [
        ...state,
        travel(undefined, action)
      ]
    case 'TRAVEL_UPDATE':
      return state.map((entry) => travel(entry, action))
    default:
      return state
  }
}

export default travelBoard
