import React from 'react'
import {connect} from 'react-redux'

import './quote.scss';

const Quote = ({quote}) => (
  <div className="quote-component component">
    <h2 className="quote-word">{quote.word}</h2>
    <h3 className="quote-meaning">{quote.meaning}</h3>
  </div>
)

const mapStateToProps = (state) => ({
  quote: state.quote
})

export default connect(
  mapStateToProps
)(Quote)
