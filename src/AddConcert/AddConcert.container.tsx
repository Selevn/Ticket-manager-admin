import React, {useEffect, useState} from 'react';
import AddConcert from "./AddConcert"
import 'materialize-css'

//import {backendUrl} from "";
/*interface Headers {
    method: string;
    body: string;
    headers: object;
}*/

const backendUrl : string = 'http://localhost:3003'

function AddConcertContainer() {

    const [disabled, setState] = useState(false);
    const [halls, setHalls] = useState([]);

    useEffect(()=>{
        async  function __ (){
            const method : string = "POST",
                body : string = JSON.stringify({}),
                headers : object = {"Content-Type": 'application/json'};

            // @ts-ignore TODO: fix
            const response = await fetch(backendUrl + "/api/concerts/getHalls", {method, body, headers} )
            const data = await response.json()
            if (!response.ok) {
                if(data.serverStatus === 500)
                {
                    window.M.toast({
                        html: "Error 500",
                        displayLength: 5000,
                        classes: "error"
                    })
                }
                else
                    window.M.toast({
                        html: "Error",
                        displayLength: 5000,
                        classes: "error"
                    })
            }
            else {
                setHalls(data.data);
            }
        }
        __();
    },[])

    const next = async ()=>{
                    const method : string = "POST",
                        body : string = JSON.stringify({}),
                        headers : object = {"Content-Type": 'application/json'};

        // @ts-ignore TODO: fix
        const response = await fetch(backendUrl + "/api/concerts/next", {method, body, headers} )
                    const data = await response.json()
                    console.log("data",data)
                    if (!response.ok) {
                        if(data.serverStatus === 500)
                        {
                            window.M.toast({
                                html: "Error 500",
                                displayLength: 5000,
                                classes: "error"
                            })
                        }
                        else
                        {
                            window.M.toast({
                                html: "error",
                                displayLength: 5000,
                                classes: "error"
                            })
                        }
                    }
                    else {
                        setState(true);
                            window.M.toast({
                                html: "all is ok",
                                displayLength: 5000,
                                classes: "success"
                            })
                    }


    }

    return (
        <AddConcert Next={next} disabled = {disabled} halls={halls}/>
    );
}

export default AddConcertContainer;
