import React from 'react';
import Footer from './components/Footer'
import './App.css';
import styles from './App.css';
import {BrowserRouter, Route, Switch, Redirect, Link} from "react-router-dom";
import axios from 'axios'
import UsersList from './components/User.js'
import ProjectList from "./components/Project";
import ProjectItems from "./components/ProjectItems";
import ProjectForm from "./components/ProjectForm";
import ToDoForm from "./components/ToDoForm";
import ToDoList from "./components/ToDo";
import LoginForm from './components/Auth.js';
import Cookies from 'universal-cookie';

const NotFound404 = ({location}) => {
    return (
        <div>
            <h1>Страница по адресу '{location.pathname}' не найдена</h1>
        </div>
    )
}


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
            'curr_user': ''
        }
    }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, () => this.load_data())
    }

    set_name(username) {
        const cookies = new Cookies()
        cookies.set('curr_user', username)
        this.setState({'curr_user': username})
        // console.log(this.state['curr_user'])
    }

    is_authenticated() {
        return !!this.state.token
    }

    logout() {
        this.set_token('')
        this.state['curr_user'] = ''
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        const curr_user = cookies.get('curr_user')
        this.setState({'token': token}, () => this.load_data())
        this.setState({'curr_user': curr_user})
    }

    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
            .then(response => {
                this.set_token(response.data['token'])
                alert("Nice to meet you, " + username)
                this.set_name(username)
            }).catch(error => alert('Неверный логин или пароль'))
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
            // `Accept': 'application/json; version=${version}`
        }
        if (this.is_authenticated()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    load_data() {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/users', {headers})
            .then(response => {
                const users = response.data
                this.setState(
                    {'users': users}
                )
            }).catch(error => console.log(error))
        this.setState({users: []})
        axios.get('http://127.0.0.1:8000/api/filters/project/', {headers}).then(
            response => {
                const projects = response.data
                this.setState(
                    {'projects': projects}
                )
            }
        ).catch(error => console.log(error))
        this.setState({projects: []})
        axios.get('http://127.0.0.1:8000/api/filters/todo/', {headers}).then(
            response => {
                const todos = response.data
                this.setState(
                    {'todos': todos}
                )
            }
        ).catch(error => console.log(error))
        this.setState({todos: []})
    }

    componentDidMount() {
        this.get_token_from_storage()
    }

    deleteProject(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/filters/project/${id}`, {headers})
            .then(response => {
                // this.setState({projects: this.state.projects.project((item) => project.id !== id)})

                this.load_data()
            }).catch(error => {
            console.log(error)
            this.setState({projects: []})
        })
    }

    createProject(name, rep_link, users) {
        const headers = this.get_headers()
        const data = {name: name, rep_link: rep_link, users: users}
        axios.post(`http://127.0.0.1:8000/api/filters/project/`, data, {headers})
            .then(response => {
                this.load_data()
            }).catch(error => {
            console.log(error)
            this.setState({projects: []})
        })
    }


    deleteToDo(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/filters/todo/${id}`, {headers})
            .then(response => {
                this.load_data()
            }).catch(error => console.log(error))
    }

    createToDo(project, text, user) {
        const headers = this.get_headers()
        const data = {
            project: project,
            text: text,
            user: user
        }
        axios.post(`http://127.0.0.1:8000/api/filters/todo/`, data, {headers})
            .then(response => {
                this.load_data()
            }).catch(error => {
            console.log(error)
            this.setState({todos: []})
        })
    }

    render() {
        return (
            <div className="App Site">

                <div className="Site-content">
                    <BrowserRouter>
                        <div className="App-header">
                            <nav>
                                <ul>
                                    <li>
                                        <Link to='/'>Users</Link>
                                    </li>
                                    <li>
                                        <Link to='/projects/'>Projects</Link>
                                    </li>
                                    <li>
                                        <Link to='/todos/'>ToDo</Link>
                                    </li>
                                    <li>
                                        {this.is_authenticated() ?
                                            <Link onClick={() => this.logout()}>Logout</Link> :
                                            <Link to='/login'>Login</Link>}
                                    </li>
                                </ul>
                                {this.is_authenticated() ?
                                    <text className={"Text-user"}> Current user is: {this.state['curr_user']}</text> :
                                    <text className={"Text-user"}> Current user is: Anonymous User</text>}
                            </nav>
                            {/*</BrowserRouter>*/}
                        </div>
                        <div className="main">
                            <content>
                                {/*<BrowserRouter>*/}
                                <Switch>
                                    <Route exact path='/'
                                           component={() => <UsersList users={this.state.users}/>}
                                    />
                                    <Redirect from='/users/' to='/'/>

                                    <Route exact path='/todos/'
                                           component={() => <ToDoList todos={this.state.todos}
                                                                      deleteToDo={(id) => this.deleteToDo(id)}/>}
                                    />

                                    <Route exact path='/todos/create'
                                           component={() => <ToDoForm users={this.state.users} projects={this.state.projects}
                                               createToDo={(project, text, user) =>
                                                   this.createToDo(project, text, user)}
                                           />}/>

                                    <Route exact path='/projects/'
                                           component={() => <ProjectList projects={this.state.projects}
                                                                         deleteProject={(id) => this.deleteProject(id)}/>}
                                    />
                                    <Route exact path='/projects/create'
                                           component={() => <ProjectForm users={this.state.users}
                                               createProject={(name, rep_link, users) => this.createProject(name, rep_link, users)}
                                           />}/>
                                    <Route exact path="/projects/:id"
                                           component={() => <ProjectItems projects={this.state.projects}
                                                                          users={this.state.users}
                                                                          todos={this.state.todos}/>}
                                    />

                                    <Route exact path='/login' component={() => <LoginForm
                                        get_token={(username, password) => this.get_token(username, password)}/>}/>
                                    <Route component={NotFound404}/>
                                </Switch>

                            </content>
                        </div>
                    </BrowserRouter>
                </div>
                <footer className={"App-footer"}>
                    <Footer/>
                </footer>
            </div>
        )
    }
}

export default App;
