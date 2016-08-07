import React from 'react'
import moment from 'moment'
import config from 'clientconfig'
import {connect} from 'react-redux'

import './travel.scss';
import icons from'./icons';

const Travel = ({travel}) => (
  <div className="travel-component">
    { travel.length ? <h2 className="travel-headline">{config.travel.train.start} - {config.travel.train.destination}</h2> : null }
      {travel.map(transport =>
        <div className="travel-entry" key={transport.id}>
          <div className="travel-icon" dangerouslySetInnerHTML={icons[transport.id]} />
          <div className="travel-times">
          {transport.times.map((time, index) =>
            <div className="travel-time" key={index}>
              <span className="travel-time-start">{time.start}</span>
              <span className="travel-time-details">
                { time.duration ? <span className="travel-time-duration">{time.duration}</span>: null }{time.traffic}
              </span>
            </div>
          )}
          </div>
        </div>
      )}
  </div>
)

const mapStateToProps = (state) => ({
  travel: state.travel
})

export default connect(
  mapStateToProps
)(Travel)
