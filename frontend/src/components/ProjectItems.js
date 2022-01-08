import React from "react";
import {useParams} from "react-router-dom";

const ProjectItem = ({project, users, todos}) => {
    const ToDoList = []

    todos.forEach((ToDoItem) => {
        if (ToDoItem.project === parseInt(project.id)) {
            ToDoList.push(ToDoItem.text)
        }
    })
    return (
        <div>
            <table>
                <tr>
                    <td><b>Project:</b></td>
                    <td>{project.name}</td>
                </tr>
                <tr>
                    <td><b>Repository link:</b></td>
                    <td> {project.rep_link}</td>
                </tr>
                <tr>
                    <td><b>Users:</b></td>
                    <td> {project.users.map((usersId) => {
                        return users.find((user) => user.id === usersId).username + ', '
                    })}</td>
                </tr>
                <tr>
                    <td><b>ToDo:</b></td>
                    <td> {ToDoList.map((todo) => todo + ', ')}</td>
                </tr>
            </table>
        </div>

    )
}
const ProjectItems = ({projects, users, todos}) => {
    let {id} = useParams();
    console.log(users)
    let filtered_projects = projects.filter((project) => project.id === parseInt(id))
    return (
        <div>
            {filtered_projects.map((project) => <ProjectItem project={project}
                                                             users={users}
                                                             todos={todos}
            />)}
        </div>
    )
}

export default ProjectItems;