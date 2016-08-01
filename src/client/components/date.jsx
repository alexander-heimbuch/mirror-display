import React from 'react'
import moment from 'moment'
import {connect} from 'react-redux'

const Date = ({date}) => (
   <div className="date-component">
      <h1>{moment(date).locale('de').format('DD.MM.YYYY')}</h1>
      <h2>{moment(date).locale('de').format('dddd')}</h2>
    </div>
)

const mapStateToProps = (state) => ({
  date: state.date
})

export default connect(
  mapStateToProps
)(Date)
