import React from 'react'
import {Link} from "react-router-dom";


const ProjectItem = ({project, deleteProject}) => {
    return (
        <tr>
            <td><Link to={`${project.id}`}> {project.name} </Link></td>
            {/*<td>{project.name}</td>*/}
            <td>{project.rep_link}</td>
            <td>{project.users}</td>
            <td>
                <button onClick={() => deleteProject(project.id)} type='button'>Delete</button>
            </td>
        </tr>
    )
}

const ProjectList = ({projects, deleteProject}) => {
    return (
        <div>
            <table>
                <caption className={"CaptionTable"}>Projects</caption>
                <th>Project name</th>
                <th>Project link</th>
                <th>Users</th>
                {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject}/>)}
            </table>
            <Link to='/projects/create'>Create</Link>
        </div>
    )
}


export default ProjectList
