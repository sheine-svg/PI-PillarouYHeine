import React from "react";
import { Link } from 'react-router-dom'

function Header (props) {
    return (
        <nav>    
            <ul className="nav nav-tabs my-4">
                {props.menu.map(menu => <li className="nav-item" key={menu.route}> <Link className="nav-link" to={menu.route}> {menu.name} </Link></li>)}
            </ul>
        </nav>
    );
};
export default Header;

/*revisar clases*/