import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProfileById } from '../redux/actions/profileActions'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import ProfileTop from '../components/ProfileTop'
import ProfileAbout from '../components/ProfileAbout'
import ProfileExperience from '../components/ProfileExperience'
import ProfileEducation from '../components/ProfileEducation'
import ProfileGithub from '../components/ProfileGithub'

const mapState = state => ({
  profile: state.profile,
  auth: state.auth
})

const Profile = ({ profile: { profile, loading }, getProfileById, match, auth }) => {
  useEffect(() => {
    getProfileById(match.params.userId)
  }, [getProfileById, match.params.userId])

  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='profile-grid my-1'>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />

            <div className='profile-exp bg-white p-2'>
              <h2 className='text-primary'>Expériences</h2>
              {profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map(exp => (
                    <ProfileExperience key={exp._id} experience={exp} />
                  ))}
                </Fragment>
              ) : (
                <h4>Pas d'expériences définies</h4>
              )}
            </div>

            <div className='profile-edu bg-white p-2'>
              <h2 className='text-primary'>Formations</h2>
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map(edu => (
                    <ProfileEducation key={edu._id} education={edu} />
                  ))}
                </Fragment>
              ) : (
                <h4>Pas de formations / bootcamps définis</h4>
              )}
            </div>

            <div className='my-2'>
              <Link to='/profiles' className='btn btn-light'>
                Retour aux profils
              </Link>
              {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (
                <Link to='/edit-profile' className='btn btn-dark'>
                  Editer le profil
                </Link>
              )}
            </div>

            {profile.githubUsername && <ProfileGithub username={profile.githubUsername} />}
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

export default connect(mapState, { getProfileById })(Profile)
