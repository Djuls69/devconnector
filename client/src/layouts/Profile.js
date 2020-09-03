import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProfileById } from '../redux/actions/profileActions'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'

const mapState = state => ({
  profile: state.profile,
  auth: state.auth
})

const Profile = ({ profile: { profile, loading }, getProfileById, match, auth }) => {
  useEffect(() => {
    getProfileById(match.params.userId)
  }, [getProfileById, match.params.userId])

  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1>Profile loaded</h1>
          <Link to='/profiles' className='btn btn-light'>
            Retour aux profils
          </Link>
          {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (
            <Link to='/edit-profile' className='btn btn-dark'>
              Editer le profil
            </Link>
          )}
        </Fragment>
      )}
    </Fragment>
  )
}

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

export default connect(mapState, { getProfileById })(Profile)
