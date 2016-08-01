import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'

import socket from './socket'
import MirrorApp from './components/mirror.jsx'
import reducers from './reducers/mirror'

const store = createStore(reducers)

ReactDOM.render(
  <Provider store={store}>
    <MirrorApp />
  </Provider>,
  document.getElementById('app')
)

store.subscribe(() => console.log(store.getState()))

socket(store.dispatch)
