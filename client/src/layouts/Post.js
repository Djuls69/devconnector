import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPost } from '../redux/actions/postActions'
import { Link } from 'react-router-dom'
import PostItem from '../components/PostItem'
import Spinner from '../components/Spinner'
import CommentForm from '../components/CommentForm'
import CommentItem from '../components/CommentItem'

const mapState = state => ({
  post: state.post
})

const Post = ({ match, post: { post, loading }, getPost }) => {
  useEffect(() => {
    getPost(match.params.postId)
  }, [getPost, match.params.postId])

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <PostItem post={post} />
      <CommentForm postId={post._id} />
      <div className='comments'>
        {post.comments.map(comment => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
      <Link to='/posts' className='btn btn-light'>
        Retour aux posts
      </Link>
    </Fragment>
  )
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired
}

export default connect(mapState, { getPost })(Post)
