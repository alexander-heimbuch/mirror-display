import React from 'react'
import moment from 'moment'
import {connect} from 'react-redux'

import {disconnected} from './icons'
import './connection.scss'

const Connection = ({connection}) => (
   <div className={"connection-component " + (connection ? 'hide' : 'show')}>
    <span className="icon" dangerouslySetInnerHTML={disconnected} />
   </div>
)

const mapStateToProps = (state) => ({
  connection: state.connection
})

export default connect(
  mapStateToProps
)(Connection)
