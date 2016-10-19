import React from 'react'
import moment from 'moment'
import config from 'clientconfig'
import {connect} from 'react-redux'

import './travel.scss';
import icons from'./icons';

const Travel = ({travel}) => (
  <div className="travel-component component">
    { travel.length ? <h2 className="travel-headline">{config.travel.start} - {config.travel.destination}</h2> : null }
      {travel.map(connection =>
        <div className="travel-connection" key={connection.id}>
					<div className="travel-summary">
						<div className="travel-icon" dangerouslySetInnerHTML={icons.train} />
          	<div className="travel-duration"><span className="overall-departure">{connection.departure}</span><span className="overall-arrival">{connection.arrival}</span></div>
					</div>
					{connection.route.map(route =>
						<div className="travel-routes" key={route.product}>
							<span className="product">{route.product}</span>
							<span className="departure">{route.departure}</span>
							⇾
							<span className="arrival">{route.arrival}</span>
						</div>
					)}
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
