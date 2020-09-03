import {
  GET_PROFILE,
  GET_PROFILE_BY_ID,
  GET_ALL_PROFILES,
  GET_REPOS,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE
} from '../types'

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
    case GET_PROFILE_BY_ID:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      }
    case GET_ALL_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      }
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
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
