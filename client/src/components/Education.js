import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { deleteEducation } from '../redux/actions/profileActions'

const Education = ({ education, deleteEducation }) => {
  const educations = education.map(edu => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className='hide-sm'>{edu.degree}</td>
      <td>
        <Moment format='DD/MM/YYYY'>{edu.from}</Moment> -{' '}
        {edu.to === null ? 'En cours' : <Moment format='DD/MM/YYYY'>{edu.to}</Moment>}
      </td>
      <td>
        <button onClick={() => deleteEducation(edu._id)} className='btn btn-danger'>
          Supprimer
        </button>
      </td>
    </tr>
  ))

  return (
    <Fragment>
      <h2 className='my-2'>Formations / Ecoles</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Ecoles / Bootcamps</th>
            <th className='hide-sm'>Titre</th>
            <th className='hide-sm'>Durée</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  )
}

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired
}

export default connect(null, { deleteEducation })(Education)
