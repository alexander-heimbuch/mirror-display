import React from 'react'

import Connection from './connection/connection.jsx'
import Date from './date/date.jsx'
import Weather from './weather/weather.jsx'
import Quote from './quote/quote.jsx'
import Travel from './travel/travel.jsx'

const MirrorApp = () => (
  <div className="mirror-app">
    <Connection />
    <Date />
    <Weather />
    <Travel />
    <Quote />
  </div>
)

export default MirrorApp
