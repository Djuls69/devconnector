import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const mapState = ({ alerts }) => ({ alerts })

const Alert = ({ alerts }) => {
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map(({ id, alertType, msg }) => (
      <div key={id} className={`alert alert-${alertType}`}>
        {msg}
      </div>
    ))
  )
}

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
}

export default connect(mapState)(Alert)
