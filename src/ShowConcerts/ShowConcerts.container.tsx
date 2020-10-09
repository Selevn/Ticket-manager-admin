import React, {useEffect, useRef, useState} from 'react';
import ShowConcerts from "./ShowConcerts"
import 'materialize-css'

//import {backendUrl} from "";


const backendUrl: string = 'http://localhost:3003'

function ShowConcertsContainer() {

  let _concerts = useState([]);
  const concerts = _concerts[0];
  const setConcerts = _concerts[1];

  useEffect(() => {
    async function __() {

      const method: string = "POST",
          body: string = JSON.stringify({}),
          headers: object = {"Content-Type": 'application/json'};

      // @ts-ignore TODO: fix
      const response = await fetch(backendUrl + "/api/concerts/getAllConcerts", {method, body, headers})
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
        setConcerts(data.data);
      }
    }

    __();
  }, [])

  const deleteConcert = async (concertId:number) => {

    const method: string = "POST",
        body: string = JSON.stringify({
          concertId:concertId
        }),
        headers: object = {"Content-Type": 'application/json'};
    // @ts-ignore TODO: fix
    const response = await fetch(backendUrl + "/api/concerts/delete", {method, body, headers})
    const data = await response.json()
    console.log(data)
    if (!response.ok) {
      if (data.serverStatus === 500) {
        window.M.toast({
          html: "Error 500",
          displayLength: 5000,
          classes: "error"
        })
      } else {
        window.M.toast({
          html: "error",
          displayLength: 5000,
          classes: "error"
        })
      }
    } else {
      window.M.toast({
        html: "all is ok",
        displayLength: 5000,
        classes: "success"
      })
    }
  }

  const undoConcert = async (concertId:number) => {

    const method: string = "POST",
        body: string = JSON.stringify({
          concertId:concertId
        }),
        headers: object = {"Content-Type": 'application/json'};
    // @ts-ignore TODO: fix
    const response = await fetch(backendUrl + "/api/concerts/undo", {method, body, headers})
    const data = await response.json()
    console.log(data)
    if (!response.ok) {
      if (data.serverStatus === 500) {
        window.M.toast({
          html: "Error 500",
          displayLength: 5000,
          classes: "error"
        })
      } else {
        window.M.toast({
          html: "error",
          displayLength: 5000,
          classes: "error"
        })
      }
    } else {
      window.M.toast({
        html: "all is ok",
        displayLength: 5000,
        classes: "success"
      })
    }
  }


  const changeConcert = async (concertId:number, datetime:string) => {

    const method: string = "POST",
        body: string = JSON.stringify({
          concertId:concertId,
          date:datetime,
        }),
        headers: object = {"Content-Type": 'application/json'};
    // @ts-ignore TODO: fix
    const response = await fetch(backendUrl + "/api/concerts/change", {method, body, headers})
    const data = await response.json()
    console.log(data)
    if (!response.ok) {
      if (data.serverStatus === 500) {
        window.M.toast({
          html: "Error 500",
          displayLength: 5000,
          classes: "error"
        })
      } else {
        window.M.toast({
          html: "error",
          displayLength: 5000,
          classes: "error"
        })
      }
    } else {
      window.M.toast({
        html: "all is ok",
        displayLength: 5000,
        classes: "success"
      })
    }
  }





return (
    <ShowConcerts concerts={concerts} deleteConcert={deleteConcert} changeConcert={changeConcert} undoConcert={undoConcert}/>
);
}

export default ShowConcertsContainer;
