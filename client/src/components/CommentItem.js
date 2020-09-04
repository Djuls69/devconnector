import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { removeComment } from '../redux/actions/postActions'

const mapState = state => ({
  auth: state.auth
})

const CommentItem = ({ comment: { date, text, name, avatar, user, _id }, postId, auth, removeComment }) => {
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
        <p className='post-date'>
          Posté le <Moment format='DD/MM/YYYY'>{date}</Moment>
        </p>
        {!auth.loading && user === auth.user._id && (
          <button onClick={() => removeComment(postId, _id)} type='button' className='btn btn-danger'>
            <i className='fas fa-times' />
          </button>
        )}
      </div>
    </div>
  )
}

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
  removeComment: PropTypes.func.isRequired
}

export default connect(mapState, { removeComment })(CommentItem)
