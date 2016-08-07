import {combineReducers} from 'redux'

import connection from './connection'
import weather from './weather'
import date from './date'
import quote from './quote'
import travel from './travel'

const mirrorApp = combineReducers({
  connection,
  date,
  weather,
  quote,
  travel
})

export default mirrorApp
