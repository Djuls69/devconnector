import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCurrentProfile, deleteAccount } from '../redux/actions/profileActions'
import Spinner from '../components/Spinner'
import DashboardActions from '../components/DashboardActions'
import Experience from '../components/Experience'
import Education from '../components/Education'

const mapState = state => ({
  profile: state.profile,
  auth: state.auth
})

const mapDispatch = { getCurrentProfile, deleteAccount }

const Dashboard = ({ getCurrentProfile, deleteAccount, profile: { profile, loading }, auth: { user } }) => {
  useEffect(() => {
    getCurrentProfile()
  }, [getCurrentProfile])

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
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <div className='my-2'>
            <button onClick={deleteAccount} className='btn btn-danger'>
              <i className='fas fa-user-minus'></i> Supprimer mon compte
            </button>
          </div>
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
  auth: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
}

export default connect(mapState, mapDispatch)(Dashboard)
