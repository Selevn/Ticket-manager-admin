import React, {useCallback, useEffect, useRef, useState} from 'react';
import ShowUsers from "./ShowUsers"

const backendUrl: string = 'http://localhost:3003'

function ShowUsersContainer() {

  const [users, setUsers] = useState<{ id: number, email: string }[]>([]);

  const [allUsers, setAllUsers] = useState<{ id: number, email: string }[]>([]);

  const [tickets, setUserTicketData] = useState<{ id: number, cost: number, band: string, name: string, place: string }[]>([]);

  const [concerts, setUserConcertData] = useState<{ concertId: number, ticketCount: number, band: string, place: string }[]>([]);

  const [currentUser, setCurrentUser] = useState<number>(0);

  const [currentConcert, setCurrentConcert] = useState<number>(0);

  const [search, setSearch] = useState<string>("")

  const [concertFlag, setConcertFlag] = useState(false);


  const concertsChange = useCallback((concertInput) => {
    setUserConcertData(concertInput);
  }, [concertFlag])

  useEffect(() => {
    async function __() {

      const method: string = "POST",
          body: string = JSON.stringify({}),
          headers: object = {"Content-Type": 'application/json'};

      //@ts-ignore
      const response = await fetch(backendUrl + "/api/users/getAllUsers", {method, body, headers})
      const data = await response.json()

      if (!response.ok) {
        if (data.serverStatus === 500) {
          window.M.toast({
            html: "Error 500",
            displayLength: 5000,
            classes: "error"
          })
        } else
          window.M.toast({
            html: "Error",
            displayLength: 5000,
            classes: "error"
          })
      } else {
        setUsers(data.data);
        setAllUsers(data.data);
      }
    }

    __();
  }, [])

  const showConcertTickets = async (userId: number, concertId: number) => {
    if (concertId === currentConcert) {
      setCurrentConcert(0)
    } else {
      const method: string = "POST",
          body: string = JSON.stringify({userId: userId, concertId: concertId}),
          headers: object = {"Content-Type": 'application/json'};

      // @ts-ignore
      const response = await fetch(backendUrl + "/api/users/getConcertTickets", {method, body, headers})
      const data = await response.json()
      if (!response.ok) {
        if (data.serverStatus === 500) {
          window.M.toast({
            html: "Error 500",
            displayLength: 5000,
            classes: "error"
          })
        } else
          window.M.toast({
            html: "Error",
            displayLength: 5000,
            classes: "error"
          })
      } else {
        setUserTicketData(data.data);
        setCurrentConcert(concertId)
      }
    }
  }

  const showUserConcerts = async (userId: number) => {
    if (userId === currentUser) {
      setCurrentUser(0);
    } else {
      const method: string = "POST",
          body: string = JSON.stringify({userId: userId}),
          headers: object = {"Content-Type": 'application/json'};

      // @ts-ignore
      const response = await fetch(backendUrl + "/api/users/getUserConcerts", {method, body, headers})
      const data = await response.json()
      if (!response.ok) {
        if (data.serverStatus === 500) {
          window.M.toast({
            html: "Error 500",
            displayLength: 5000,
            classes: "error"
          })
        } else
          window.M.toast({
            html: "Error",
            displayLength: 5000,
            classes: "error"
          })
      } else {
        setUserConcertData(data.data);
        setCurrentUser(userId)
      }
    }
  }

  const deleteUser = async (userId: number) => {
    if (window.confirm("Are you shure?")) {
      const method: string = "POST",
          body: string = JSON.stringify({userId: userId}),
          headers: object = {"Content-Type": 'application/json'};

      // @ts-ignore
      const response = await fetch(backendUrl + "/api/users/deleteUser", {method, body, headers})
      const data = await response.json()
      if (!response.ok) {
        if (data.serverStatus === 500) {
          window.M.toast({
            html: "Error 500",
            displayLength: 5000,
            classes: "error"
          })
        } else
          window.M.toast({
            html: "Error",
            displayLength: 5000,
            classes: "error"
          })
      } else {
        setUsers(users.filter(item => item.id !== userId) as never[])
      }

    }
  }

  const deleteTicket = async (ticketId: number, concertId: number) => {
    if (window.confirm("Are you shure?")) {
      const method: string = "POST",
          body: string = JSON.stringify({userId: concertId, ticketId: ticketId}),
          headers: object = {"Content-Type": 'application/json'};

      // @ts-ignore
      const response = await fetch(backendUrl + "/api/users/deleteTicket", {method, body, headers})
      const data = await response.json()
      if (!response.ok) {
        if (data.serverStatus === 500) {
          window.M.toast({
            html: "Error 500",
            displayLength: 5000,
            classes: "error"
          })
        } else
          window.M.toast({
            html: "Error",
            displayLength: 5000,
            classes: "error"
          })
      } else {
        setUserTicketData(tickets.filter(item => item.id !== ticketId) as never[])
        const currentConcert = concerts.find(item => item.concertId === concertId);
        currentConcert && currentConcert.ticketCount--
        setConcertFlag(!concertFlag)
        concertsChange(concerts);
      }
    }
  }


  const searchChange = (event: { target: { value: string; }; }) => {
    setSearch(event.target.value);
    setUsers(allUsers.filter(item => item.email.includes(event.target.value)) as any)
  }


  return (
      <ShowUsers
          users={users}
          showUserConcerts={showUserConcerts}
          showConcertTickets={showConcertTickets}
          tickets={tickets}
          concerts={concerts}
          currentUser={currentUser}
          currentConcert={currentConcert}
          deleteUser={deleteUser}
          deleteTicket={deleteTicket}
          searchChange={searchChange}
          search={search}
      />
  );
}

export default ShowUsersContainer;
