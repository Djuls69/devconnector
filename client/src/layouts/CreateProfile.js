import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { createProfile } from '../redux/actions/profileActions'

const mapDispatch = { createProfile }

const CreateProfile = ({ history, createProfile }) => {
  const [showMedias, setShowMedias] = useState(false)
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubUsername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: ''
  })
  const {
    company,
    website,
    location,
    status,
    skills,
    githubUsername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    createProfile(formData, history)
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Créer votre profil</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Ajoutez quelques informations pour faire briller votre profil !
      </p>
      <small>* = nécessaire</small>
      <form className='form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <select name='status' value={status} onChange={handleChange}>
            <option value='0'>* Votre status professionnel</option>
            <option value='Developer'>Développeur</option>
            <option value='Junior Developer'>Junior Développeur</option>
            <option value='Senior Developer'>Senior Développeur</option>
            <option value='Manager'>Manager</option>
            <option value='Student or Learning'>Etudiant</option>
            <option value='Instructor'>Professeur</option>
            <option value='Intern'>Interne</option>
            <option value='Other'>Autre</option>
          </select>
          <small className='form-text'>Où en êtes-vous dans votre carrière ?</small>
        </div>
        <div className='form-group'>
          <input type='text' placeholder='Entreprise' name='company' value={company} onChange={handleChange} />
          <small className='form-text'>Votre entreprise, ou celle pour qui vous travaillez</small>
        </div>
        <div className='form-group'>
          <input type='text' placeholder='Site internet' name='website' value={website} onChange={handleChange} />
          <small className='form-text'>Votre site internet, ou celui de votre entreprise</small>
        </div>
        <div className='form-group'>
          <input type='text' placeholder='Ville' name='location' value={location} onChange={handleChange} />
          <small className='form-text'>Votre ville</small>
        </div>
        <div className='form-group'>
          <input type='text' placeholder='* Compétences' name='skills' value={skills} onChange={handleChange} />
          <small className='form-text'>
            Merci d'utiliser une virgule pour séparer vos compétences (ex: HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Pseudo Github'
            name='githubUsername'
            value={githubUsername}
            onChange={handleChange}
          />
          <small className='form-text'>Si vous souhaitez afficher vos repos Github, merci d'inclure votre pseudo</small>
        </div>
        <div className='form-group'>
          <textarea placeholder='Introduction' name='bio' value={bio} onChange={handleChange}></textarea>
          <small className='form-text'>Parlez un peu de vous</small>
        </div>

        <div className='my-2'>
          <button type='button' className='btn btn-light' onClick={() => setShowMedias(!showMedias)}>
            Ajoutez les liens de vos réseaux sociaux
          </button>
          <span>Optionnel</span>
        </div>

        {showMedias && (
          <Fragment>
            <div className='form-group social-input'>
              <i className='fab fa-twitter fa-2x'></i>
              <input type='text' placeholder='Twitter URL' name='twitter' value={twitter} onChange={handleChange} />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x'></i>
              <input type='text' placeholder='Facebook URL' name='facebook' value={facebook} onChange={handleChange} />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x'></i>
              <input type='text' placeholder='YouTube URL' name='youtube' value={youtube} onChange={handleChange} />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-linkedin fa-2x'></i>
              <input type='text' placeholder='Linkedin URL' name='linkedin' value={linkedin} onChange={handleChange} />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x'></i>
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={handleChange}
              />
            </div>
          </Fragment>
        )}

        <input type='submit' className='btn btn-primary my-1' />
        <Link to='/dashboard' className='btn btn-light my-1'>
          Retour
        </Link>
      </form>
    </Fragment>
  )
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired
}

export default connect(null, mapDispatch)(CreateProfile)
