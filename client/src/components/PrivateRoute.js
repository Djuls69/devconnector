import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const mapState = state => ({
  auth: state.auth
})

const PrivateRoute = ({ auth: { isAuthenticated, loading }, component: Component, ...otherProps }) => (
  <Route
    {...otherProps}
    render={props => {
      return !isAuthenticated && !loading ? <Redirect to='/login' /> : <Component {...props} />
    }}
  />
)

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
}

export default connect(mapState)(PrivateRoute)
