import React from 'react'
import {connect} from 'react-redux'

const Weather = ({cards}) => (
  <div className="weather-component">
    {cards.map(weather =>
      <div className="weather" key={weather.id}>
        temperature: {weather.temperature}
        perceip: {weather.percip}
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
