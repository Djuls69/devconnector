import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAlert } from '../redux/actions/alertActions'
import { register } from '../redux/actions/authActions'
import PropTypes from 'prop-types'

const mapDispatch = {
  setAlert,
  register
}

const mapState = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })
  const { name, email, password, password2 } = formData

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (password2 !== password) {
      setAlert('Les mots de passe ne correspondent pas', 'danger', 3000)
    } else {
      register({ name, email, password })
    }
  }

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>S'enregistrer</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Créez votre compte
      </p>
      <form className='form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <input type='text' placeholder='Nom' name='name' value={name} onChange={handleChange} />
        </div>
        <div className='form-group'>
          <input type='email' placeholder='Email' name='email' value={email} onChange={handleChange} />
          <small className='form-text'>
            Ce site utilise Gravatar. Si vous souhaitez avoir une image utilisateur, veuillez utiliser une adresse email
            associée à Gravatar.
          </small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Mot de passe'
            name='password'
            minLength='6'
            value={password}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Répétez le mot de passe'
            name='password2'
            minLength='6'
            value={password2}
            onChange={handleChange}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Envoyer' />
      </form>
      <p className='my-1'>
        Déjà un compte? <Link to='/login'>Se connecter</Link>
      </p>
    </Fragment>
  )
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

export default connect(mapState, mapDispatch)(Register)
