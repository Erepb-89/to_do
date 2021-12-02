import React from 'react';
import Menu from './components/Menu'
import Footer from './components/Footer'
import './App.css';
import styles from './App.css';
import {HashRouter, Route, Switch, Redirect} from "react-router-dom";
import axios from 'axios'
import UsersList from './components/User.js'
import ProjectList from "./components/Project";
import ToDoList from "./components/ToDo";

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
            'todos': []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users')
            .then(response => {
                const users = response.data
                this.setState(
                    {'users': users}
                )
            }).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/filters/project/').then(
            response => {
                const projects = response.data
                this.setState(
                    {'projects': projects}
                )
            }
        ).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/filters/todo/').then(
            response => {
                const todos = response.data
                this.setState(
                    {'todos': todos}
                )
            }
        ).catch(error => console.log(error))
    }

    render() {
        return (
            <div className="App Site">
                <div className="Site-content">
                    <div className="App-header">
                        <Menu/>
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

console.log(styles);
export default App;
