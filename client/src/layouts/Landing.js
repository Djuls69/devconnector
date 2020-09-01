import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Developer Connector</h1>
          <p className='lead'>
            Créez un profil / portfolio de développeur, partagez des posts et obtenez l'aide d'autres développeurs
          </p>
          <div className='buttons'>
            <Link to='register' className='btn btn-primary'>
              S'enregistrer
            </Link>
            <Link to='/login' className='btn btn-light'>
              Se connecter
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Landing
