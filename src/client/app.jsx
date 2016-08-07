import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'

import {onConnect, onDisconnect, onMessage} from './socket'
import MirrorApp from './components/mirror.jsx'
import reducers from './reducers/mirror'

import './styles/app.scss';

const store = createStore(reducers)

ReactDOM.render(
  <Provider store={store}>
    <MirrorApp />
  </Provider>,
  document.getElementById('app')
)

// Socket connection
onMessage(store.dispatch)

onConnect(() => {
  store.dispatch({
    type: 'CONNECTION_OPEN'
  })
})

onDisconnect(() => {
  store.dispatch({
    type: 'CONNECTION_CLOSE'
  })
})
