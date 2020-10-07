import React from 'react';
import {Link} from 'react-router-dom';

interface IProps {
    Next: ()=>void;
    disabled: boolean;
    halls: object[];
    // any other props that come into the component
}

interface itemInterface {
    description: string;
    img: string;
    id: number;
    place: string;
    // any other props that come into the component
}



function AddConcert({Next, disabled, halls}:IProps) {

    return (
        <>
            <Link to={'/showUsers'}>Show users</Link>
                <label>Place:
                    {/*<input disabled={disabled} name="place" type="text" placeholder="Place"/>*/}
                    <select>
                        {halls.map((item: itemInterface) =>
                            (<option>{item.place}</option>)
                        )}

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
