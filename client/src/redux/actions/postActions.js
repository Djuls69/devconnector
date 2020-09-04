import axios from 'axios'
import { setAlert } from './alertActions'
import { GET_POSTS, POST_ERROR, UPDATE_LIKES, DELETE_POST } from '../types'

// Get all posts
export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get('/api/posts')
    dispatch({
      type: GET_POSTS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    })
  }
}

// Add like
export const addLike = postId => async dispatch => {
  try {
    const res = await axios.post(`/api/posts/like/${postId}`)
    dispatch({
      type: UPDATE_LIKES,
      payload: { id: postId, likes: res.data }
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    })
  }
}

// Remove like
export const removeLike = postId => async dispatch => {
  try {
    const res = await axios.post(`/api/posts/unlike/${postId}`)
    dispatch({
      type: UPDATE_LIKES,
      payload: { id: postId, likes: res.data }
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    })
  }
}

// Delete post
export const deletePost = postId => async dispatch => {
  try {
    await axios.delete(`/api/posts/${postId}`)
    dispatch({
      type: DELETE_POST,
      payload: postId
    })
    dispatch(setAlert('Post supprimé', 'success', 3000))
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    })
  }
}
