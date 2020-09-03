import axios from 'axios'
// import { setAlert } from './alertActions'
import {
  GET_PROFILE,
  GET_PROFILE_BY_ID,
  GET_ALL_PROFILES,
  GET_REPOS,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  ACCOUNT_DELETED
} from '../types'
import { setAlert } from './alertActions'

export const getAllProfiles = () => async dispatch => {
  dispatch({ type: CLEAR_PROFILE })
  try {
    const res = await axios.get('/api/profile')

    dispatch({
      type: GET_ALL_PROFILES,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    })
  }
}

export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/me')

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    })
  }
}

export const getProfileById = id => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/user/${id}`)

    dispatch({
      type: GET_PROFILE_BY_ID,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    })
  }
}

export const getGithubRepos = username => async dispatch => {
  try {
    const res = await axios.get(`api/profile/github/${username}`)

    dispatch({
      type: GET_REPOS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    })
  }
}

export const clearProfile = () => dispatch => {
  dispatch({
    type: CLEAR_PROFILE
  })
}

// Create or update a profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.post('/api/profile', formData, config)
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })

    dispatch(setAlert(edit ? 'Profil mis à jour' : 'Profil créé', 'success'))

    history.push('/dashboard')
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger', 3000)))
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    })
  }
}

export const addExperience = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.post('/api/profile/experiences', formData, config)
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert('Expérience ajouté', 'success', 3000))

    history.push('/dashboard')
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger', 3000)))
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    })
  }
}

export const addEducation = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.post('/api/profile/education', formData, config)
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert('Formation ajouté', 'success', 3000))

    history.push('/dashboard')
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger', 3000)))
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    })
  }
}

// Delete experience
export const deleteExperience = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/experiences/${id}`)
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })
    dispatch(setAlert('Expérience supprimée', 'success', 3000))
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    })
  }
}

// Delete education
export const deleteEducation = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`)
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })
    dispatch(setAlert('Formation supprimée', 'success', 3000))
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    })
  }
}

// Delete account & profile
export const deleteAccount = () => async dispatch => {
  if (window.confirm('Attention ! Cette opération ne peut pas être annulée !')) {
    try {
      await axios.delete(`/api/profile`)
      dispatch({
        type: CLEAR_PROFILE
      })
      dispatch({
        type: ACCOUNT_DELETED
      })
      dispatch(setAlert('Compte définitivement supprimé', 'success', 3000))
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status
        }
      })
    }
  }
}
