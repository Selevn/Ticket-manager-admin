import React from 'react';
import {Link} from 'react-router-dom';
import {useAuth} from "../customHooks/auth.hook";
import {useHistory} from "react-router";

import styled from "styled-components"

const Main = styled.div`
display:flex;
padding:30px;
width:100%;
flex-direction:column;
align-items:center;
`

const Label = styled.label`
font-size:1.4rem;
font-family:sans-serif;
display:flex;
padding:10px;
width:30%;
min-width:300px;
flex-direction:row;
justify-content: space-between;
background-color:#00000010;
`
const Sector = styled.div`
margin-top:10px;
font-size:1.4rem;
font-family:sans-serif;
display:flex;
background-color:#00000010;
padding:10px;
width:30%;
min-width:360px;
flex-direction:column;
justify-content: space-between;
`
const Button = styled.button`
font-size:1.2rem;
border-radius:30%;
box-shadow:none;
background-color:#0000001a;
outline:none;
border:none;
margin:.3rem;
height:50px;
width:120px;
&:hover{
cursor:pointer;
background-color:#0000002a;
}
`





interface IProps {
    Next: () => void;
    Confirm: () => void;
    disabled: boolean;
    halls: hallsInterface[] | undefined;
    refs: refsInerface;
    sectors: sectorInterface[];
    // any other props that come into the component
}

interface sectorInterface {
    place: string;
    id: number;
    name: string;
    numOfSeas: number;
    features: string;
    svgCors: string;
}

interface itemInterface {
    description: string;
    img: string;
    id: number;
    place: string;
    // any other props that come into the component
}

interface hallsInterface {
    description: string;
    id: number;
    img: string;
    place: string;
}

interface refsInerface {
    placeRef: React.RefObject<HTMLSelectElement>;
    imgSrcRef: React.RefObject<HTMLInputElement>;
    bandRef: React.RefObject<HTMLInputElement>;
    dateRef: React.RefObject<HTMLInputElement>;
    timeRef: React.RefObject<HTMLInputElement>;
}



function AddConcert({Next, disabled, halls, refs, sectors, Confirm}: IProps) {
  const {isLoggined} = useAuth()
  const history = useHistory();
  if (isLoggined())
    return (
        <Main>
            <Label>Place:
                <select name="place" ref={refs.placeRef} disabled={disabled}>
                    {halls && halls.map((item: hallsInterface) => (
                        <option value={item.place} key={item.id}>{item.place}</option>))}
                </select>
            </Label>
            <Label>ImgSrc:
                <input disabled={disabled} ref={refs.imgSrcRef} name="img" type="text" placeholder="ImgSrc"/>
            </Label>
            <Label>Band:
                <input disabled={disabled} ref={refs.bandRef} name="band" type="text" placeholder="Band"/>
            </Label>
            <Label>Date:
                <input disabled={disabled} ref={refs.dateRef} name="data" type="date" placeholder="Date"/>
            </Label>
            <Label>Time:
                <input disabled={disabled} ref={refs.timeRef} name="time" type="time" placeholder="Time"/>
            </Label>
            <Button disabled={disabled} onClick={Next}>Next</Button>
            {sectors && sectors[0] && (
                <>
                    {sectors.map(item=>(
                        <Sector>
                            <b>Sector {item.name}:</b><br/>
                            Features:
                                {item.features}
                            <br/>
                            <Label>Cost:
                                <input name={item.name+"_cost"} type="number" min="1" step="any" placeholder="Cost"/>
                            </Label>
                        </Sector>
                    ))}
                    <Button onClick={Confirm}>Confirm</Button>
                </>)}
        </Main>
    )
  else
  {
    history.push('/login');
    return(<></>)
  }
}

export default AddConcert;
