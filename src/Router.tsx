import React from 'react';
import {Switch, Route} from 'react-router-dom';
import AdminContainer from './Admin/Admin.container'
import AddConcertContainer from "./AddConcert/AddConcert.container";
import ShowUsersContainer from "./ShowUsers/ShowUsers.container";

function Router() {
  return (
    <>
        <Switch>
            <Route path='/login/'/>
            <Route path='/addConcert' component={AddConcertContainer}/>
            <Route path='/showUsers' component={ShowUsersContainer}/>
            <Route path='/' component={AdminContainer}/>
        </Switch>
      </>
  );
}

export default Router;
