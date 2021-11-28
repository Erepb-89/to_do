import React from 'react';
import Menu from './components/Menu'
import Footer from './components/Footer'
import './App.css';
import styles from './App.css';
import UsersList from './components/User.js'
import axios from 'axios'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users')
            .then(response => {
                const users = response.data
                this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error))
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
                            <h1>
                                Users
                            </h1>
                            <UsersList users={this.state.users}/>
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