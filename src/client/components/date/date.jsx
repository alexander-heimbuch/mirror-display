import React from 'react'
import moment from 'moment'
import {connect} from 'react-redux'

import './date.scss';

const Date = ({date}) => (
   <div className="date-component component">
      <h1 className="current-time">{moment(date).locale('de').format('HH:mm')}</h1>
      <h2 className="current-date">{moment(date).locale('de').format('dddd, Do MMMM')}</h2>
    </div>
)

const mapStateToProps = (state) => ({
  date: state.date
})

export default connect(
  mapStateToProps
)(Date)
