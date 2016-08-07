import React from 'react'
import moment from 'moment'
import {connect} from 'react-redux'

import './weather.scss';
import icons from'./icons';

const Weather = ({cards}) => (
  <div className="weather-component component">
    {cards.map(weather =>
      <div className="weather-entry" key={weather.id}>
        <h2 className="weather-time">{moment(weather.time).locale('de').format('HH:mm')}</h2>
        <div className="weather-icon" dangerouslySetInnerHTML={icons[weather.short]} />
        <h3 className="weather-temperature">{weather.temperature}&deg;C</h3>
        <h4 className="weather-percip">({weather.percip}%)</h4>
      </div>
    )}
  </div>
)

const mapStateToProps = (state) => ({
  cards: state.weather
})

export default connect(
  mapStateToProps
)(Weather)
