import React from 'react';
import {Link} from 'react-router-dom';
import {useAuth} from "../customHooks/auth.hook";
import {useHistory} from "react-router";

function Admin({logout}:{logout:()=>void}) {
  const {isLoggined} = useAuth()
  const history = useHistory();
  if (isLoggined())
    return (
        <>
            <Link to={'/addConcert'}>Add Concert</Link>
            <Link to={'/showUsers'}>Show tickets</Link>
            <Link to={'/showConcerts'}>Show concerts</Link>
          <button onClick = {logout}>Logout</button>
        </>
    )
  else
  {
    history.push('/login')
    return(<></>)
  }
}

export default Admin;
