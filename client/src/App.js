import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './layouts/Navbar'
import Landing from './layouts/Landing'
import './App.css'
import Login from './layouts/Login'
import Register from './layouts/Register'
import Alert from './components/Alert'
import setAuthToken from './utils/setAuthToken'
import { loadUser } from './redux/actions/authActions'
import { Provider } from 'react-redux'
import store from './redux/store'
import Dashboard from './layouts/Dashboard'
import PrivateRoute from './components/PrivateRoute'
import CreateProfile from './layouts/CreateProfile'
import EditProfile from './layouts/EditProfile'
import AddExperience from './layouts/AddExperience'
import AddEducation from './layouts/AddEducation'
import Profiles from './layouts/Profiles'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Route exact path='/' component={Landing} />
        <div className='container'>
          <Alert />
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/profiles' component={Profiles} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <PrivateRoute exact path='/create-profile' component={CreateProfile} />
            <PrivateRoute exact path='/edit-profile' component={EditProfile} />
            <PrivateRoute exact path='/add-experience' component={AddExperience} />
            <PrivateRoute exact path='/add-education' component={AddEducation} />
          </Switch>
        </div>
      </Router>
    </Provider>
  )
}

export default App
