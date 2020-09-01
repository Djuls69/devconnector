import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code'></i> DevConnector
        </Link>
      </h1>
      <ul>
        <li>
          <Link to='/profiles'>Développeurs</Link>
        </li>
        <li>
          <Link to='/register'>S'enregistrer</Link>
        </li>
        <li>
          <Link to='/login'>Se connecter</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
