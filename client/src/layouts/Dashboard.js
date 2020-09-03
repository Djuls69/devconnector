import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCurrentProfile } from '../redux/actions/profileActions'
import Spinner from '../components/Spinner'
import DashboardActions from '../components/DashboardActions'

const mapState = state => ({
  profile: state.profile,
  auth: state.auth
})

const mapDispatch = { getCurrentProfile }

const Dashboard = ({ getCurrentProfile, profile: { profile, loading }, auth: { user } }) => {
  useEffect(() => {
    getCurrentProfile()
    // eslint-disable-next-line
  }, [])

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Bienvenue {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
        </Fragment>
      ) : (
        <Fragment>
          <p>Merci de mettre à jour votre profil.</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Créer votre profil
          </Link>
        </Fragment>
      )}
    </Fragment>
  )
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

export default connect(mapState, mapDispatch)(Dashboard)
