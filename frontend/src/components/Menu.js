import React from 'react';


class Menu extends React.Component {
    render() {
        return (
            <div>
                <ul className="menu">
                    <li><a href="#">Главная</a></li>
                    <li><a href="#">Пользователи</a>
                    </li>
                    <li><a href="#">Список дел</a></li>
                </ul>
            </div>
        );
    }
}

export default Menu;