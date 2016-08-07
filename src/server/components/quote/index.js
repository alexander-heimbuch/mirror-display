import Bluebird from 'bluebird'

import website from '../../utils/website'
import words from './words'

const dictUrl = (word) => `https://de.wiktionary.org/wiki/${word.replace(' ', '_')}`

const currentDay = () => {
  let now = new Date()
  let	start = new Date(now.getFullYear(), 0, 0)
  let diff = now - start
  let oneDay = 1000 * 60 * 60 * 24

  return Math.floor(diff / oneDay)
}

export default () =>
  website(dictUrl(words[currentDay()]))
    .then((content) => {
      let word = content('#firstHeading').first().text()
      let meaning = content('[title="Sinn und Bezeichnetes (Semantik)"] + dl dd').first().text()

      return Bluebird.resolve({
        word: word.trim(),
        meaning: meaning.trim().replace(/\[.+?\]\s*/g, '')
      })
    })
