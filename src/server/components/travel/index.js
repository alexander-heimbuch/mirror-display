import Bluebird from 'bluebird'
import car from './car'
import train from './train'

export default () => Bluebird.join(car(), train())
