import Nav from 'react-bootstrap/Nav';
import { NavLink, Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ROUTES } from '../../../Routes'
import "./index.css"

const Navbar = () => {
    const location = useLocation();
    const [activeKey, setActiveKey] = useState('/');
    useEffect(() => {
        setActiveKey(location.pathname);
    }, [location]);
    return (
        <Nav
            className="navbar justify-content-center"
            
            activeKey={activeKey}
        >
            <Nav.Item>
                <NavLink
                    to={ROUTES.HOME}
                    className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                >
                    <img className="visa_picture" src="/front/public/visa_label_blue.png"/>Визовый центр РФ
                </NavLink>
            </Nav.Item>

            <Nav.Item>
                <NavLink
                    to={ROUTES.VISAS}
                    className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                >
                    Визы
                </NavLink>
            </Nav.Item>
        </Nav>
    );
}

export default Navbar;