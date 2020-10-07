import React from 'react';
import {Link} from 'react-router-dom';

function ShowUsers({users, showUserTickets}: { users: { id: number, email: string }[], showUserTickets:(userId:number)=>void }) {
    return (
        <>
            <Link to={'/'}>Home</Link>
            {users[0] && users.map(item => (<>
                <div key={item.id} onClick={()=>{showUserTickets(item.id)}} id = {item.id as unknown as string}>
                    {item.email}
                </div>
            </>))}
        </>
    );
}

export default ShowUsers;
