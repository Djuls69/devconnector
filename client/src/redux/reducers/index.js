import { combineReducers } from 'redux'
import alerts from './alertReducer'
import auth from './authReducer'

export default combineReducers({
  alerts,
  auth
})
