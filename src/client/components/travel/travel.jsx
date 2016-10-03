import React from 'react'
import moment from 'moment'
import config from 'clientconfig'
import {connect} from 'react-redux'

import './travel.scss';
import icons from'./icons';

const Travel = ({travel}) => (
  <div className="travel-component component">
    { travel.length ? <h2 className="travel-headline">{config.travel.start} - {config.travel.destination}</h2> : null }
      {travel.map(departure =>
        <div className="travel-departure" key={departure.id}>
          <div className="travel-icon" dangerouslySetInnerHTML={icons.train} />
          <div className="travel-start travel-details">{departure.start}</div>
          <div className="travel-details">{departure.duration}</div>
          <div className="travel-details">{departure.traffic}</div>
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
