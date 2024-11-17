import Nav from 'react-bootstrap/Nav';
import { NavLink, Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ROUTES } from '../../../Routes'
import "./index.css"

const Navbar2 = () => {
    const location = useLocation();
    const [activeKey, setActiveKey] = useState('/');
    useEffect(() => {
        setActiveKey(location.pathname);
    }, [location]);
    return (
        <Nav
            className="navbar2"
            
            activeKey={activeKey}
        >
            <Nav.Item>
                <NavLink
                    to={ROUTES.HOME}
                    className={({ isActive }) => (isActive ? "navbar2 nav-link active" : "navbar2 nav-link")}
                >
                    <img className="visa_picture" src="/front/public/visa_label_white.png"/>Визовый центр РФ
                </NavLink>
            </Nav.Item>

            <Nav.Item>
                <NavLink
                    to={ROUTES.VISAS}
                    className="navbar2 nav-link"
                >
                    Визы
                </NavLink>
            </Nav.Item>
        </Nav>
    );
}

export default Navbar2;