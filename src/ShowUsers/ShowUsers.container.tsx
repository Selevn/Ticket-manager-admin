import React, {useEffect, useRef, useState} from 'react';
import ShowUsers from "./ShowUsers"

const backendUrl: string = 'http://localhost:3003'

function ShowUsersContainer() {
    const _users = useState([]);
    const users:{id:number, email:string}[] = _users[0];
    const setUsers = _users[1];

    const _tickets = useState([]);
    const tickets:{id:number, cost:string|number, concertId:string|number,sectorId:string|number,}[] = _tickets[0];
    const setUserTicketData = _tickets[1];

    console.log("tickets",tickets)

    useEffect(() => {
        async function __() {

            const method: string = "POST",
                body: string = JSON.stringify({}),
                headers: object = {"Content-Type": 'application/json'};

            // @ts-ignore TODO: fix
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
            }
        }

        __();
    }, [])

    const showUserTickets = async (userId:number) => {
        const method: string = "POST",
            body: string = JSON.stringify({userId:userId}),
            headers: object = {"Content-Type": 'application/json'};

        // @ts-ignore TODO: fix
        const response = await fetch(backendUrl + "/api/users/getUserTickets", {method, body, headers})
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
            console.log("gotcha")
            setUserTicketData(data.data);
        }
    }

    return (
        <ShowUsers
        users = {users}
        showUserTickets = {showUserTickets}
        />
    );
}

export default ShowUsersContainer;
