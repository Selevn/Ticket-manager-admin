import React from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import {useAuth} from "../customHooks/auth.hook";
import {useHistory} from "react-router";
import styled from 'styled-components'
import AddConcertContainer from "../AddConcert/AddConcert.container";
import ShowUsersContainer from "../ShowUsers/ShowUsers.container";
import ShowConcertsContainer from "../ShowConcerts/ShowConcerts.container";
import Button from "../Styles/Button";
const Menu = styled.div`
height:100vh;
min-width:150px;
width:10%;
display:flex;
flex-direction:column;
padding-top:30px;
padding-left:15px;
background-color:#0000ff30;
align-items:left;
`;
const Main = styled.div`
display:flex;
flex-direction:row;
`;


const MenuItem = styled.div`
display:flex;
justify-content:left;
justify-items:left;
height:30px;
`;
const LinkStyle = styled(Link)`
text-decoration:none !important;
font-size:1.2rem;
color:black;
font-family:sans-serif;
&:hover{
color:blue;
}

`;


function Admin({logout}: { logout: () => void }) {
  const {isLoggined} = useAuth()
  const history = useHistory();
  if (isLoggined())
    {
      return (
          <Main>
              <Menu>
                <MenuItem><LinkStyle to={'/addConcert'}>Add Concert</LinkStyle></MenuItem>
                <MenuItem><LinkStyle to={'/showUsers'}> Show Users</LinkStyle></MenuItem>
                <MenuItem><LinkStyle to={'/showConcerts'}>Show concerts</LinkStyle></MenuItem>
                <MenuItem>
                  <Button onClick={logout}>Logout</Button>
                </MenuItem>
              </Menu>
            <Switch>
              <Route path='/addConcert' component={AddConcertContainer}/>
              <Route path='/showUsers' component={ShowUsersContainer}/>
              <Route path='/showConcerts' component={ShowConcertsContainer}/>
            </Switch>
          </Main>
          )
    }
  else {
    history.push('/login')
    return (<></>)
  }
}

export default Admin;
