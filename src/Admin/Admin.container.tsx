import React from 'react';
import Admin from "./Admin"
import {useAuth} from "../customHooks/auth.hook";

function AdminContainer() {
    const {logout} = useAuth()

    return (
        <Admin logout={logout}/>
    );
}

export default AdminContainer;
