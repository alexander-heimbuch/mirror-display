const quote = (state = {}, action) => {
  switch (action.type) {
    case 'QUOTE_UPDATE':
      return {
        word: action.word,
        meaning: action.meaning
      }
    default:
      return state
  }
}

export default quote
