import React from 'react'
import { Container } from "@material-ui/core"

import Navbar from './components/Navbar/Navbar'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'
import { GoogleOAuthProvider } from '@react-oauth/google';
import PostDetails from './components/postDetails/PostDetails'
import Users from './components/users/Users'

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'))
  return (
    <Router>
      <GoogleOAuthProvider clientId='818464594125-h1rd2rvk8hijvue650mr606uagbrd6v9.apps.googleusercontent.com'>
        <Container maxWidth='xl'>
          <Navbar />
          <Switch>
            <Route path={'/'} exact component={() => user ? <Redirect to={'/posts'} /> : <Redirect to={'/auth'} />} />
            <Route path={'/posts'} exact component={() => <Home />} />
            <Route path='/users' exact component={Users} />
            <Route path={'/posts/search'} exact component={Home} />
            <Route path={'/posts/:id'} exact component={PostDetails} />
            <Route path={'/auth'} exact component={() => !user ? <Auth /> : <Redirect to={'/posts'} />} />
          </Switch>
        </Container>
      </GoogleOAuthProvider>
    </Router>
  )
}

export default App
