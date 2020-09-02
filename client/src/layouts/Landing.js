import React from 'react'
import PropTypes from 'prop-types'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const mapState = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />
  }

  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Developer Connector</h1>
          <p className='lead'>
            Créez un profil / portfolio de développeur, partagez des posts et obtenez l'aide d'autres développeurs
          </p>
          <div className='buttons'>
            <Link to='register' className='btn btn-primary'>
              S'enregistrer
            </Link>
            <Link to='/login' className='btn btn-light'>
              Se connecter
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
}

export default connect(mapState)(Landing)
