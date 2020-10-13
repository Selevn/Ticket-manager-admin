import React from 'react';
import {Link} from 'react-router-dom';
import {useAuth} from "../customHooks/auth.hook";
import {useHistory} from "react-router";

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
        <>
          <Link to={'/showUsers'}>Show users</Link>
          <label>Place:
            <select name="place" ref={refs.placeRef} disabled={disabled}>
              {halls && halls.map((item: hallsInterface) => (
                  <option value={item.place} key={item.id}>{item.place}</option>))}
            </select>
          </label>
          <label>ImgSrc:
            <input disabled={disabled} ref={refs.imgSrcRef} name="img" type="text" placeholder="ImgSrc"/>
          </label>
          <label>Band:
            <input disabled={disabled} ref={refs.bandRef} name="band" type="text" placeholder="Band"/>
          </label>
          <label>Date:
            <input disabled={disabled} ref={refs.dateRef} name="data" type="date" placeholder="Date"/>
          </label>
          <label>Time:
            <input disabled={disabled} ref={refs.timeRef} name="time" type="time" placeholder="Time"/>
          </label>
          <button disabled={disabled} onClick={Next}>Next</button>
          {sectors && sectors[0] && (
              <>
                {sectors.map(item => (
                    <div>
                      <b>Sector {item.name}:</b><br/>
                      Features:
                      {item.features}
                      <br/>
                      <label>Cost:
                        <input name={item.name + "_cost"} type="number" min="1" step="any" placeholder="Cost"/>
                      </label>
                    </div>
                ))}
                <button onClick={Confirm}>Confirm</button>
              </>)}
        </>
    )
  else {
    history.push('/login');
    return (<></>)
  }
}

export default AddConcert;
