import React from 'react';
import {Link} from 'react-router-dom';

interface IProps {
    Next: ()=>void;
    disabled: boolean;
    halls: hallsInterface[]|undefined;
    // any other props that come into the component
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



function AddConcert({Next, disabled, halls}:IProps) {
    return (
        <>
            <Link to={'/showUsers'}>Show users</Link>
                <label>Place:
                    <select name="place">
                        {halls && halls.map((item:hallsInterface)=>(<option value={item.place} key = {item.id}>{item.place}</option>))}
                    </select>
                </label>
                <label>ImgSrc:
                    <input disabled={disabled} name="img" type="text" placeholder="ImgSrc"/>
                </label>
                <label>Band:
                <input disabled={disabled} name="band" type="text" placeholder="Band"/>
                </label>
                <label>Date:
                    <input disabled={disabled} name="data" type="date" placeholder="Date"/>
                </label>
                <label>Time:
                    <input disabled={disabled} name="time" type="time" placeholder="Time"/>
                </label>
            <button onClick={Next}>Next</button>
        </>
    );
}

export default AddConcert;
