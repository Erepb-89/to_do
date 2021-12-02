import React from 'react';
import {HashRouter, Route, Link} from 'react-router-dom'

class Menu extends React.Component {
    render() {
        return (
            <div className="menu">
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
                        </ul>
                    </nav>
                </HashRouter>
            </div>
        )
    }
}

export default Menu;