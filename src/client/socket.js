import Socket from 'engine.io-client'

const connection = new Socket(`${window.location.protocol}//${window.location.hostname}:3001/`)

export default (dispatch) => {
  connection.on('message', (signal) => dispatch(JSON.parse(signal)))
}
