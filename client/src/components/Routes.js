import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Alert from './Alert'
import PrivateRoute from './PrivateRoute'
import Dashboard from '../layouts/Dashboard'
import CreateProfile from '../layouts/CreateProfile'
import EditProfile from '../layouts/EditProfile'
import AddExperience from '../layouts/AddExperience'
import AddEducation from '../layouts/AddEducation'
import Profiles from '../layouts/Profiles'
import Profile from '../layouts/Profile'
import Posts from '../layouts/Posts'
import Post from '../layouts/Post'
import NotFound from '../layouts/NotFound'
import Login from '../layouts/Login'
import Register from '../layouts/Register'

const Routes = () => {
  return (
    <div className='container'>
      <Alert />
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/profiles' component={Profiles} />
        <Route exact path='/profile/:userId' component={Profile} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/posts' component={Posts} />
        <PrivateRoute exact path='/post/:postId' component={Post} />
        <PrivateRoute exact path='/create-profile' component={CreateProfile} />
        <PrivateRoute exact path='/edit-profile' component={EditProfile} />
        <PrivateRoute exact path='/add-experience' component={AddExperience} />
        <PrivateRoute exact path='/add-education' component={AddEducation} />
        <Route component={NotFound} />
      </Switch>
    </div>
  )
}

export default Routes
