import React from 'react'
import {Link} from "react-router-dom";


const ToDoItem = ({todo, deleteToDo}) => {
    return (
        <tr>
            <td>{todo.project}</td>
            <td>{todo.text}</td>
            <td>{todo.is_active}</td>
            <td>{todo.date_create}</td>
            <td>{todo.date_update}</td>
            <td>{todo.user}</td>
            <td>
                <button onClick={() => deleteToDo(todo.id)} type='button'>Delete</button>
            </td>
        </tr>
    )
}

const ToDoList = ({todos, deleteToDo}) => {

    return (
        <div>
            <table>
                <caption className={"CaptionTable"}>ToDo</caption>
                <th>Project</th>
                <th>Text</th>
                <th>Is active</th>
                <th>Create date</th>
                <th>Update date</th>
                <th>User</th>
                <th></th>
                {todos.map((todo) => <ToDoItem todo={todo} deleteToDo={deleteToDo}/>)}
            </table>
            <Link to='/todos/create'>Create</Link>
        </div>
    )
}


export default ToDoList
