import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const { email, password } = formData

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    console.log('SUCCESS')
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Se connecter</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Créez votre compte
      </p>
      <form className='form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <input type='email' placeholder='Email' name='email' value={email} onChange={handleChange} />
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
        <input type='submit' className='btn btn-primary' value='Envoyer' />
      </form>
      <p className='my-1'>
        Besoin d'un compte? <Link to='/register'>S'enregistrer</Link>
      </p>
    </Fragment>
  )
}

export default Login
