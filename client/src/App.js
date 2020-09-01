import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './layouts/Navbar'
import Landing from './layouts/Landing'
import './App.css'
import Login from './layouts/Login'
import Register from './layouts/Register'
import Alert from './components/Alert'

const App = () => {
  return (
    <Router>
      <Navbar />
      <Route exact path='/' component={Landing} />
      <div className='container'>
        <Alert />
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
