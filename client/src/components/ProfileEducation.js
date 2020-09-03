import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileEducation = ({ education: { school, degree, fieldOfStudy, from, to, description, current } }) => {
  return (
    <div>
      <h3>{school}</h3>
      <p>
        {<Moment format='DD/MM/YYYY'>{from}</Moment>} -{' '}
        {current ? 'En cours' : <Moment format='DD/MM/YYYY'>{to}</Moment>}
      </p>
      <p>
        <strong>Diplôme: </strong>
        {degree}
      </p>
      <p>
        <strong>Domaine: </strong>
        {fieldOfStudy}
      </p>
      <p>
        <strong>Description: </strong>
        {description}
      </p>
    </div>
  )
}

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired
}

export default ProfileEducation
