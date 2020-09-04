import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addLike, removeLike, deletePost } from '../redux/actions/postActions'

const mapState = state => ({
  auth: state.auth
})

const PostItem = ({
  auth,
  post: { _id, text, name, avatar, user, date, likes, comments },
  addLike,
  removeLike,
  deletePost
}) => {
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img className='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>Posté le {<Moment format='DD/MM/YYYY'>{date}</Moment>}</p>
        <button onClick={() => addLike(_id)} type='button' className='btn btn-light'>
          <i className='fas fa-thumbs-up'></i> {likes.length > 0 && <span>{likes.length}</span>}
        </button>
        <button onClick={() => removeLike(_id)} type='button' className='btn btn-light'>
          <i className='fas fa-thumbs-down'></i>
        </button>
        <Link to={`/post/${_id}`} className='btn btn-primary'>
          Discussion {comments.length > 0 && <span className='comment-count'>{comments.length}</span>}
        </Link>
        {!auth.loading && auth.user._id === user && (
          <button onClick={() => deletePost(_id)} type='button' className='btn btn-danger'>
            <i className='fas fa-times'></i>
          </button>
        )}
      </div>
    </div>
  )
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
}

export default connect(mapState, { addLike, removeLike, deletePost })(PostItem)