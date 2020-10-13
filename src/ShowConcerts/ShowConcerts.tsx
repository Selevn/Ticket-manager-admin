import React from 'react';
import {Link} from 'react-router-dom';
import {useAuth} from "../customHooks/auth.hook";
import {useHistory} from "react-router";


function ShowConcerts({concerts, deleteConcert, changeConcert, undoConcert}: {
  concerts: { id: number, band: string, date: string, place: string, imgSrc: string }[],
  deleteConcert: (item: number) => void,
  undoConcert: (id: number) => void,
  changeConcert: (id: number, date: string) => void
}) {
  const {isLoggined} = useAuth()
  const history = useHistory();
  if (isLoggined())
    return (
        <>
          <Link to={'/showUsers'}>Show users</Link>
          {
            concerts.map(item => {
              return (<div>
                    <div>id: {item.id}</div>
                    <div>band: {item.band}</div>
                    <div>date: {item.date}</div>
                    <div>place: {item.place}</div>
                    <input type="datetime-local" id={item.id as unknown as string + "_datetype"}/>
                    <button onClick={() => {
                      changeConcert(item.id, (document.getElementById(item.id + "_datetype") as HTMLInputElement).value)
                    }}>Change date
                    </button>
                    <button onClick={() => {
                      deleteConcert(item.id)
                    }}>Delete
                    </button>
                    <button onClick={() => {
                      undoConcert(item.id)
                    }}>Undo
                    </button>
                  </div>
              )
            })
          }
        </>
    )
  else {
    history.push('/login');
    return (<></>)
  }
}

export default ShowConcerts;
