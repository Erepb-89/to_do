import React from 'react'


const UserItem = ({user}) => {
    return (
        <tr>
            <td>{user.id}</td>
            <td>{user.username}</td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.email}</td>
        </tr>
    )
}

const UsersList = ({users}) => {
    return (
        <table>
            <caption className={"CaptionTable"}>Users</caption>
            <thead>
            <th>Id</th>
            <th>Username</th>
            <th>First name</th>
            <th>Last Name</th>
            <th>E-mail</th>
            </thead>
            <tbody>
            {users.map((user) => <UserItem user={user}/>)}
            </tbody>
        </table>
    )
}

export default UsersList
