import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import Spinner from '../components/Spinner'
import { connect } from 'react-redux'
import { getAllProfiles } from '../redux/actions/profileActions'
import ProfileItem from '../components/ProfileItem'

const mapState = state => ({
  profile: state.profile
})

const Profiles = ({ getAllProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getAllProfiles()
    // eslint-disable-next-line
  }, [])

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Développeurs</h1>
      <p className='lead'>
        <i className='fab fa-connectdevelop'></i> Recherchez et connectez-vous avec d'autres développeurs
      </p>
      <div className='profiles'>
        {profiles.length > 0 ? (
          profiles.map(profile => <ProfileItem key={profile._id} profile={profile} />)
        ) : (
          <h4>Pas de profils pour le moment...</h4>
        )}
      </div>
    </Fragment>
  )
}

Profiles.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

export default connect(mapState, { getAllProfiles })(Profiles)
