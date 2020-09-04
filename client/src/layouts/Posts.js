import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../components/Spinner'
import { getPosts } from '../redux/actions/postActions'
import PostItem from '../components/PostItem'
import PostForm from './PostForm'

const mapState = state => ({
  post: state.post
})

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts()
  }, [getPosts])

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Posts</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Bienvenue chez les dévs !
      </p>
      <PostForm />
      {posts.map(post => (
        <PostItem key={post._id} post={post} showActions />
      ))}
    </Fragment>
  )
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
}

export default connect(mapState, { getPosts })(Posts)
