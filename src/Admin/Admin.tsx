import React from 'react';
import {Link} from 'react-router-dom';

function Admin() {
    return (
        <>
            <Link to={'/addConcert'}>Add Concert</Link>
            <Link to={'/showUsers'}>Show tickets</Link>
        </>
    );
}

export default Admin;
