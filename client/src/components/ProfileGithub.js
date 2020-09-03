import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { getGithubRepos } from '../redux/actions/profileActions'
import { connect } from 'react-redux'
import GithubRepo from './GithubRepo'

const mapState = state => ({
  profile: state.profile
})

const ProfileGithub = ({ username, getGithubRepos, profile: { repos } }) => {
  useEffect(() => {
    getGithubRepos(username)
  }, [getGithubRepos, username])

  return (
    repos.length > 0 && (
      <div className='profile-github'>
        <h2 className='text-primary my-1'>
          <i className='fab fa-github'></i> Repos Github
        </h2>
        {repos.map(repo => (
          <GithubRepo key={repo.id} repo={repo} />
        ))}
      </div>
    )
  )
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired,
  getGithubRepos: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

export default connect(mapState, { getGithubRepos })(ProfileGithub)
