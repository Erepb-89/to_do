import React from 'react';
import Footer from './components/Footer'
import './App.css';
import styles from './App.css';
import {HashRouter, Route, Switch, Redirect, Link} from "react-router-dom";
import axios from 'axios'
import UsersList from './components/User.js'
import ProjectList from "./components/Project";
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
        console.log(this.state['curr_user'])
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

    render() {
        return (
            <div className="App Site">
                <div className="Site-content">
                    <div className="App-header">
                        <HashRouter>
                            <nav>
                                <ul>
                                    <li>
                                        <Link to='/'>Users</Link>
                                    </li>
                                    <li>
                                        <Link to='/projects'>Projects</Link>
                                    </li>
                                    <li>
                                        <Link to='/todos'>ToDo</Link>
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
                        </HashRouter>
                    </div>
                    <div className="main">
                        <content>
                            <HashRouter>
                                <Switch>
                                    <Route exact path='/'
                                           component={() => <UsersList users={this.state.users}/>}
                                    />
                                    <Redirect from='/users' to='/'/>
                                    <Route exact path='/projects'
                                           component={() => <ProjectList projects={this.state.projects}/>}
                                    />
                                    <Route exact path='/todos'
                                           component={() => <ToDoList todos={this.state.todos}/>}
                                    />
                                    <Route exact path='/login' component={() => <LoginForm
                                        get_token={(username, password) => this.get_token(username, password)}/>}/>
                                    <Route component={NotFound404}/>
                                </Switch>
                            </HashRouter>
                        </content>
                    </div>
                </div>
                <footer className={"App-footer"}>
                    <Footer/>)
                </footer>
            </div>
        )
    }
}

export default App;
