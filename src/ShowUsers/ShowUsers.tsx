import React from 'react';
import {Link} from 'react-router-dom';
import {useHistory} from "react-router";
import {useAuth} from "../customHooks/auth.hook";
import styled from "styled-components";

import Button from "../Styles/Button";
import Info from "../Styles/Info";

const Main = styled.div`
display:flex;
padding:30px;
width:100%;
flex-direction:column;
align-items:center;
`
const User = styled.div`
display:flex;
padding:5px;
padding-left:15px;
width:100%;
flex-direction:row;

&:hover{
cursor:pointer;
outline:2px solid black;
}

justify-content:space-between;
&:nth-child(4n-2){
background-color:#00000020;
}
&:nth-child(4n){
background-color:#00000010;
}

`
const UserConcerts = styled.div`
display:flex;
width:100%;
flex-direction:column;
`

const Tickets = styled.div`
display:flex;
width:100%;
flex-direction:column;
`


const Concert = styled.div`
padding:5px;
display:flex;
width:100%;
flex-direction:row;
justify-content:space-between;
min-height:30px;
cursor:pointer;
font-size:1.2rem;
&:hover{
outline:2px solid black;
}
&:nth-child(4n+1){
background-color:#00000010;
}
&:nth-child(4n-1){
background-color:#0000001a;
}
`
const Ticket = styled.div`
padding:5px;
display:flex;
width:100%;
padding-left:25px;
flex-direction:row;
justify-content:space-between;
min-height:30px;
cursor:pointer;
font-size:1.2rem;
&:hover{
outline:2px solid black;
}
&:nth-child(2n-1){
background-color:#00000008;
}
&:nth-child(2n){
background-color:#00000010;
}
`

function ShowUsers({searchChange, search, users, showUserConcerts, showConcertTickets, tickets, concerts, currentUser, currentConcert, deleteUser}: {
  users: { id: number, email: string }[],
  showUserConcerts: (userId: number) => void,
  deleteUser: (userId: number) => void,
  searchChange: (event: { target: { value: string; }; }) => void,
  search: string,
  showConcertTickets: (userId: number, concertId: number) => void,
  tickets: { id: number, cost: number, band: string, name: string, place: string }[],
  concerts: { concertId: number, ticketCount: number, band: string, place: string }[],
  currentUser: number,
  currentConcert: number,
}) {
  const {isLoggined} = useAuth()
  const history = useHistory();
  if (isLoggined())
    return (
        <Main>
          <input onChange={searchChange} value={search}/>
          {users[0] && users.map(item => (<>
            <User key={item.id} onClick={() => {
              showUserConcerts(item.id)
            }}>
              {item.email}
              <Button small onClick={() => {
                deleteUser(item.id);
                return false
              }}>Delete</Button>
            </User>
            <UserConcerts>
              {item.id === currentUser && concerts[0] && concerts.map(_item => {
                return (
                    <>
                    <Concert className={String(_item.concertId)} onClick={() => {
                      showConcertTickets(currentUser, _item.concertId)
                    }}>
                      <Info>id: {_item.concertId}</Info>
                      <Info>band: {_item.band}</Info>
                      <Info>name: {_item.place}</Info>
                      <Info>count: {_item.ticketCount}</Info>
                    </Concert>
                <Tickets>
                  {_item.concertId === currentConcert && tickets.map(
                      __item => {
                        return (<Ticket id={String(_item.concertId) + "_1"}>
                          <Info>id: {__item.id}</Info>
                          <Info>sectorName: {__item.name}</Info>
                          <Info>cost: {__item.cost}</Info>
                        </Ticket>)
                      }
                  )}
                </Tickets>
                </>
                )
              })}
            </UserConcerts>
          </>))}
        </Main>
    )
  else {
    history.push("/login")
    return (<></>)
  }
}

export default ShowUsers;
