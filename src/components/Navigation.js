import {useLocation, Link, withRouter, NavLink} from 'react-router-dom';
import {useEffect} from 'react';
import {navLinks} from "../defaults/nav-links";
import * as path from "path";
const Navigation = ({location: {pathname}}) => {
    return (
        <div className="col-2 bg-transparent position-fixed" id="sticky-sidebar">
            <a href={"http://ozinshe.com/"} target="_blank">
            <img src="/img/logo.svg" className="logo"/>
            </a>
                <ul className="nav-links">
                {navLinks.map(nav=> (
                    <li className={pathname.includes(nav.pathname) && 'active'}>
                        <Link as={NavLink} to={nav.pathname}>
                            <img className="mr-5" src={pathname.includes(nav.pathname) ? nav.imgActive : nav.img}/> {nav.name}
                        </Link>
                    </li>
                ))}

            </ul>
        </div>
    )
}

export default (withRouter(Navigation));