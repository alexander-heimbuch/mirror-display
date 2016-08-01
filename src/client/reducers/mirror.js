import {combineReducers} from 'redux'

import weather from './weather'
import date from './date'

const mirrorApp = combineReducers({
  date,
  weather
})

export default mirrorApp
/*
{
  date: 1469866347872, // current server time
  weather: [{
    id: 'morning',

    temp: 10.2,
    percip: 0.2,
    time: 1469866347872, // == 9:00
    short: 'clear-day'
  }, {
    id: 'noon',

    temp: 20.2,
    percip: 0.5,
    time: 1469868347872, // == 12:00
    short: 'rain-day'
  }, {
    id: 'evening',

    temp: 18,
    percip: 0.1,
    time: 1469886347872, // == 17:00
    short: 'clear'
  }]
}
*/

// UPDATE TIME
