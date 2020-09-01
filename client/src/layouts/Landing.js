import React from 'react'

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
            <a href='register.html' className='btn btn-primary'>
              S'enregistrer
            </a>
            <a href='login.html' className='btn btn-light'>
              Se connecter
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Landing
