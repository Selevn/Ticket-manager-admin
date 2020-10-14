import React from 'react';
import {Link} from 'react-router-dom';
import {useAuth} from "../customHooks/auth.hook";
import {useHistory} from "react-router";
import Main from "../Styles/Main";
import Button from "../Styles/Button";
import Info from "../Styles/Info";
import styled from "styled-components";

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
const Input = styled.input`
width:180px;
font-size:1rem;
`


function ShowConcerts({concerts, deleteConcert, changeConcert,undoConcert}: { concerts: { id: number, band: string,status:number , date: string, place: string, imgSrc: string }[] ,
                                                   deleteConcert: (item:number)=>void,
  undoConcert:(id:number)=>void,
  changeConcert:(id:number,date:string)=>void}) {
  const {isLoggined} = useAuth()
  const history = useHistory();
  if (isLoggined())
    return (
        <Main>
          <Concert>
            <Info vshort>Id</Info>
            <Info vshort>Status</Info>
            <Info short>Band</Info>
            <Info short>Date</Info>
            <Info short>Place</Info>
            <Info short></Info>
            <Info short></Info>
            <Info short></Info>

          </Concert>
          {
            concerts.map(item => {
              const day = new Date(item.date).getDate();
              const month = new Date(item.date).getMonth()+1;
              const year = new Date(item.date).getFullYear();
              const hour = String(new Date(item.date).getHours()).padStart(2, '0');
              const minute = String(new Date(item.date).getMinutes()).padStart(2, '0');
              return (<Concert>
                        <Info vshort>{item.id}</Info>
                        <Info vshort>{item.status===0?"normal":item.status===1?"changed":"declined"}</Info>
                        <Info short>{item.band}</Info>
                        <Info short>{`${day}-${month}-${year}, ${hour}:${minute}`}</Info>
                        <Info short>{item.place}</Info>
                        <Input type="datetime-local" id={item.id as unknown as string + "_datetype"}/>
                        <Button small onClick={()=>{changeConcert(item.id,(document.getElementById(item.id + "_datetype") as HTMLInputElement).value)}}>Change date</Button>
                        <Button small onClick={()=>{deleteConcert(item.id)}}>Delete</Button>
                        <Button small onClick={()=>{undoConcert(item.id)}}>Undo</Button>
                      </Concert>
                      )
            })
          }
        </Main>
    )
  else {
    history.push('/login');
    return (<></>)
  }
}

export default ShowConcerts;
