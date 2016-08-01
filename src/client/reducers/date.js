const date = (state = Date.now(), action) => {
  switch (action.type) {
    case 'DATE_UPDATE':
      return action.date
    default:
      return state
  }
}

export default date
