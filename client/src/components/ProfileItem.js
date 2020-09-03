import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ProfileItem = ({ profile }) => {
  const {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills
  } = profile

  return (
    <div className='profile bg-light'>
      <img src={avatar} alt={`${name} avatar`} className='round-img' />
      <div>
        <h2>{name}</h2>
        <p>
          {status} {company && <span> chez {company}</span>}
        </p>
        <p className='my-1'>{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className='btn btn-primary'>
          Voir le profil
        </Link>
      </div>
      <ul>
        {skills.slice(0, 4).map((skill, idx) => (
          <li key={idx} className='text-primary'>
            <i className='fas fa-check'></i> {skill}
          </li>
        ))}
      </ul>
    </div>
  )
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileItem
