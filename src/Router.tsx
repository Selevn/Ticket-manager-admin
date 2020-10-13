import React from 'react';
import {Switch, Route} from 'react-router-dom';
import AdminContainer from './Admin/Admin.container'
import AddConcertContainer from "./AddConcert/AddConcert.container";
import ShowUsersContainer from "./ShowUsers/ShowUsers.container";
import LoginContaineer from "./Login/Login.container";
import ShowConcertsContainer from "./ShowConcerts/ShowConcerts.container";
import "./CSS/Main.css"
function Router() {
  return (
      <>
        <Switch>
          <Route path='/login' component={LoginContaineer}/>
          <Route path='/' component={AdminContainer}/>
        </Switch>
      </>
  );
}

export default Router;
