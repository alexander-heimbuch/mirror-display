const connection = (state = false, action) => {
  switch (action.type) {
    case 'CONNECTION_OPEN':
      return true
    case 'CONNECTION_CLOSE':
      return false
    default:
      return state
  }
}

export default connection
