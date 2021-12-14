import React from 'react'


const ToDoItem = ({todo}) => {
    return (
        <tr>
            <td>
                {todo.project}
            </td>
            <td>
                {todo.text}
            </td>
            <td>
                {todo.is_active}
            </td>
            <td>
                {todo.date_create}
            </td>
            <td>
                {todo.date_update}
            </td>
            <td>
                {todo.user}
            </td>
        </tr>
    )
}

const ToDoList = ({todos}) => {
    return (
        <table>
            <caption className={"CaptionTable"}>ToDo</caption>
            <th>
                Project
            </th>
            <th>
                Text
            </th>
            <th>
                Is active
            </th>
            <th>
                Create date
            </th>
            <th>
                Update date
            </th>
            <th>
                User
            </th>
            {todos.map((todo) => <ToDoItem todo={todo}/>)}
        </table>
    )
}


export default ToDoList
