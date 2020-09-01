import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './layouts/Navbar'
import Landing from './layouts/Landing'
import './App.css'

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Landing} />
      </Switch>
    </Router>
  )
}

export default App
