import { SET_ALERT, REMOVE_ALERT } from '../types'

const INIT_STATE = []

const alertReducer = (state = INIT_STATE, action) => {
  const { type, payload } = action
  switch (type) {
    case SET_ALERT:
      return [...state, payload]
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload)
    default:
      return state
  }
}

export default alertReducer
