import React from 'react'
import PropTypes from 'prop-types'

const GithubRepo = ({ repo: { name, description, forks, watchers, html_url, stargazers_count } }) => {
  return (
    <div className='repo bg-white p-1 my-1'>
      <div>
        <h4>
          <a href={html_url} target='_blank' rel='noopener noreferrer'>
            {name}
          </a>
        </h4>
        {description && <p>{description}</p>}
      </div>
      <div>
        <ul>
          <li className='badge badge-primary'>Stars: {stargazers_count}</li>
          <li className='badge badge-dark'>Watchers: {watchers}</li>
          <li className='badge badge-light'>Forks: {forks}</li>
        </ul>
      </div>
    </div>
  )
}

GithubRepo.propTypes = {
  repo: PropTypes.object.isRequired
}

export default GithubRepo
