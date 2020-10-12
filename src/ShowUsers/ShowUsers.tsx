import React from 'react';
import {Link} from 'react-router-dom';
import {useHistory} from "react-router";
import {useAuth} from "../customHooks/auth.hook";

function ShowUsers({searchChange,search,users, showUserConcerts, showConcertTickets, tickets, concerts, currentUser, currentConcert, deleteUser}: {
  users: { id: number, email: string }[],
  showUserConcerts: (userId: number) => void,
  deleteUser: (userId: number) => void,
  searchChange: (event: { target: { value: string; }; }) => void,
  search:string,
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
        <>
          <Link to={'/'}>Home</Link>
          <input onChange={searchChange} value={search}/>
          {users[0] && users.map(item => (<>
            <div key={item.id} onClick={() => {
              showUserConcerts(item.id)
            }}>
              {item.email}
            </div>
            <button onClick = {()=>{deleteUser(item.id); return false}}>Delete</button>
            <div>
              {item.id === currentUser &&concerts[0]&& concerts.map(_item => {
                return (
                    <>
                      <div className={String(_item.concertId)} onClick={() => {
                        showConcertTickets(currentUser, _item.concertId)
                      }}>
                        <div>id: {_item.concertId}</div>
                        <div>band: {_item.band}</div>
                        <div>name: {_item.place}</div>
                        <div>count: {_item.ticketCount}</div>
                      </div>
                      <div id={String(_item.concertId) + "_1"}>
                        {_item.concertId === currentConcert && tickets.map(
                            __item => {
                              return (<>
                                <div>id: {__item.id}</div>
                                <div>sectorName: {__item.name}</div>
                                <div>cost: {__item.cost}</div>
                              </>)
                            }
                        )}
                      </div>
                    </>)
              })}
            </div>
          </>))}
        </>
    )
  else {
    history.push("/login")
    return (<></>)
  }
}

export default ShowUsers;
