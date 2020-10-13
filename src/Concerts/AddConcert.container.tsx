import React, {useEffect, useRef, useState} from 'react';
import AddConcert from "./AddConcert"
import 'materialize-css'

//import {backendUrl} from "";
interface sectorInterface {
  place: string;
  id: number;
  name: string;
  numOfSeas: number;
  features: string;
  svgCors: string;
}

const backendUrl: string = 'http://localhost:3003'

function AddConcertContainer() {

  const [disabled, setDisabled] = useState(false);
  const [halls, setHalls] = useState([]);
  let _sectors = useState([]);
  const sectors: sectorInterface[] = _sectors[0];
  const setSectors = _sectors[1];

  const placeRef: null | React.RefObject<HTMLSelectElement> = useRef(null);
  const imgSrcRef: null | React.RefObject<HTMLInputElement> = useRef(null);
  const bandRef: null | React.RefObject<HTMLInputElement> = useRef(null);
  const dateRef: null | React.RefObject<HTMLInputElement> = useRef(null);
  const timeRef: null | React.RefObject<HTMLInputElement> = useRef(null);

  const refs = {
    placeRef,
    imgSrcRef,
    bandRef,
    dateRef,
    timeRef
  }

  useEffect(() => {
    async function __() {

      const method: string = "POST",
          body: string = JSON.stringify({}),
          headers: object = {"Content-Type": 'application/json'};

      // @ts-ignore TODO: fix
      const response = await fetch(backendUrl + "/api/concerts/getHalls", {method, body, headers})
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
        setHalls(data.data);
      }
    }

    __();
  }, [])

  const next = async () => {
    if (dateRef.current &&
        timeRef.current &&
        imgSrcRef.current &&
        bandRef.current &&
        dateRef.current.value &&
        timeRef.current.value &&
        imgSrcRef.current.value &&
        bandRef.current.value) {
      let date = new Date(String(dateRef.current && dateRef.current.value) + " " + String(timeRef.current && timeRef.current.value));

      const method: string = "POST",
          body: string = JSON.stringify({
            place:
                placeRef.current && placeRef.current.value,
          }),
          headers: object = {"Content-Type": 'application/json'};
      // @ts-ignore TODO: fix
      const response = await fetch(backendUrl + "/api/concerts/next", {method, body, headers})
      const data = await response.json()
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
        setDisabled(true);
        setSectors(data.data)
        window.M.toast({
          html: "all is ok",
          displayLength: 5000,
          classes: "success"
        })
      }
    } else {
      window.M.toast({
        html: "Fill all fields, please",
        displayLength: 5000,
        classes: "error"
      })
    }

  }

  const Confirm = async () => {
    let sectorsData: { cost: string | number, sectorId: string | number, concertId?: string | number | undefined }[] = [];
    let passFlag = true;
    sectors.map(item => {
      if (document.getElementsByName(item.name + "_cost")[0]) {
        if (!(document.getElementsByName(item.name + "_cost")[0] as HTMLInputElement).value)
          passFlag = false;
        sectorsData.push({
          cost: (document.getElementsByName(item.name + "_cost")[0] as HTMLInputElement).value,
          sectorId: item.id
        })
      }
    })
    if (passFlag) {
      if (dateRef.current &&
          timeRef.current &&
          imgSrcRef.current &&
          bandRef.current &&
          dateRef.current.value &&
          timeRef.current.value &&
          imgSrcRef.current.value
          && bandRef.current.value) {
        let date = new Date(String(dateRef.current && dateRef.current.value) + " " + String(timeRef.current && timeRef.current.value));

        const method: string = "POST",
            body: string = JSON.stringify({
              place:
                  placeRef.current && placeRef.current.value,
              imgSrc: imgSrcRef.current && imgSrcRef.current.value,
              band: bandRef.current && bandRef.current.value,
              date: date,
            }),
            headers: object = {"Content-Type": 'application/json'};

        // @ts-ignore TODO: fix
        const response = await fetch(backendUrl + "/api/concerts/addConcert", {method, body, headers})
        const data = await response.json()

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
          sectorsData.map(i => i.concertId = data.data.insertId)
          setDisabled(false);
          setSectors(data.data)
          window.M.toast({
            html: "all is ok",
            displayLength: 5000,
            classes: "success"
          })
          dateRef.current.value = ""
          timeRef.current.value = ""
          imgSrcRef.current.value = ""
          bandRef.current.value = ""
        }
      } else {
        window.M.toast({
          html: "Fill all fields, please",
          displayLength: 5000,
          classes: "error"
        })
      }

      sectorsData.forEach(async item => {
        const method: string = "POST",
            body: string = JSON.stringify(item),
            headers: object = {"Content-Type": 'application/json'};
        // @ts-ignore TODO: fix
        const response = await fetch(backendUrl + "/api/concerts/fillSectors", {method, body, headers})
        const data = await response.json()
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
        }
      })
    } else {
      window.M.toast({
        html: "Fill all fields!",
        displayLength: 5000,
        classes: "error"
      })
    }
  }


  return (
      <AddConcert Next={next}
                  disabled={disabled}
                  halls={halls}
                  refs={refs}
                  sectors={sectors}
                  Confirm={Confirm}
      />
  );
}

export default AddConcertContainer;
