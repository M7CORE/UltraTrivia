import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
//import{CoginitoUserPool}from 'amazon-cognito-identitiy-js';

import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
//import CardPage from './pages/CardPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProfilePage from './pages/ProfilePage';
import FaqPage from './pages/FaqPage';
import LeaderboardPage from './pages/LeaderboardPage';

function App() {
  return (
    <Router >
      <Switch>
        <Route path="/" exact>
          <LoginPage />
        </Route>
        <Route path="/signup" exact>
          <SignupPage />
        </Route>
        <Route path="/ForgotPassword" exact>
          <ForgotPasswordPage/>
        </Route>
        <Route path="/profile" exact>
          <ProfilePage />
        </Route>
        <Route path="/Faq" exact>
          <FaqPage />
        </Route>
        <Route path="/home" exact>
          <LeaderboardPage/>
        </Route>
        <Redirect to="/" />
      </Switch>  
    </Router>
  );
}

export default App;
