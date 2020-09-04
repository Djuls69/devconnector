import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPost } from '../redux/actions/postActions'
import { Link } from 'react-router-dom'
import PostItem from '../components/PostItem'
import Spinner from '../components/Spinner'

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
