import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addExperience } from '../redux/actions/profileActions'

const AddExperience = ({ addExperience, history }) => {
  const [dateDisabled, setDateDisabled] = useState(false)
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: ''
  })

  const { company, title, location, from, to, current, description } = formData

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    addExperience(formData, history)
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Ajouter une expérience</h1>
      <p className='lead'>
        <i className='fas fa-code-branch'></i> Ajoutez tous les postes de développeur que vous avez occupés dans le
        passé
      </p>
      <small>* = requis</small>
      <form className='form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <input type='text' placeholder='* Titre' name='title' value={title} onChange={handleChange} required />
        </div>
        <div className='form-group'>
          <input type='text' placeholder='* Société' name='company' value={company} onChange={handleChange} required />
        </div>
        <div className='form-group'>
          <input type='text' placeholder='Lieu' name='location' value={location} onChange={handleChange} />
        </div>
        <div className='form-group'>
          <h4>Date de début</h4>
          <input type='date' name='from' value={from} onChange={handleChange} />
        </div>
        <div className='form-group'>
          <p>
            <input
              type='checkbox'
              name='current'
              checked={current}
              value={current}
              onChange={() => {
                setFormData({ ...formData, current: !current })
                setDateDisabled(!dateDisabled)
              }}
            />{' '}
            Poste actuel
          </p>
        </div>
        <div className='form-group'>
          <h4>Date de fin</h4>
          <input type='date' name='to' value={to} onChange={handleChange} disabled={dateDisabled} />
        </div>
        <div className='form-group'>
          <textarea
            name='description'
            cols='30'
            rows='5'
            placeholder='Description'
            value={description}
            onChange={handleChange}
          ></textarea>
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Retour
        </Link>
      </form>
    </Fragment>
  )
}

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired
}

export default connect(null, { addExperience })(AddExperience)
