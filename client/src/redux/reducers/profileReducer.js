import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, UPDATE_PROFILE } from '../types'

const INIT_STATE = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {}
}

const profileReducer = (state = INIT_STATE, action) => {
  const { type, payload } = action

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      }
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false
      }
    default:
      return state
  }
}

export default profileReducer
