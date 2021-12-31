import React from "react";
import {useParams} from "react-router-dom";

const ProjectItem = ({project, users, todos}) => {
    const ToDoList = []
    console.log("project.id: " + project.id)

    todos.forEach((ToDoItem) => {
        if (ToDoItem.project === project.id) {
            ToDoItem.push(ToDoItem.text)
        }
    })
    return (

        <ul>
            <li><b>Name Project:</b> {project.name}</li>
            <li><b>Link Project:</b> {project.rep_link}</li>
            {/*<li><b>Users:</b> {project.users.map((id) => {*/}
            {/*    return users.find((user) => user.id === id).username + ', '*/}
            {/*})}</li>*/}
            <li><b>Todo:</b> {ToDoList.map((todo) => todo + ', ')}</li>
        </ul>


    )
}
const ProjectItems = ({projects, users, todos}) => {
    console.log(projects)
    let {id} = useParams();
    let filtered_projects = projects.filter((project) => project.id === id)
    console.log(id)
    return (
        <div>
            {filtered_projects.map((project) => <ProjectItem project={project}
                                                            // users={users}
                                                            todos={todos}
            />)}
        </div>
    )
}

export default ProjectItems;