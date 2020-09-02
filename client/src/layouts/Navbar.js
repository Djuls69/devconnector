import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../redux/actions/authActions'
import PropTypes from 'prop-types'

const mapState = state => ({
  auth: state.auth
})

const mapDispatch = { logout }

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user'></i> <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
      <li>
        <Link to='#!' onClick={logout}>
          <i className='fas fa-sign-out-alt'></i> <span className='hide-sm'>Logout</span>
        </Link>
      </li>
    </ul>
  )

  const guestLinks = (
    <ul>
      <li>
        <Link to='/profiles'>Développeurs</Link>
      </li>
      <li>
        <Link to='/register'>S'enregistrer</Link>
      </li>
      <li>
        <Link to='/login'>Se connecter</Link>
      </li>
    </ul>
  )

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code'></i> DevConnector
        </Link>
      </h1>
      {!loading && <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>}
    </nav>
  )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

export default connect(mapState, mapDispatch)(Navbar)
