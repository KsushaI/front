import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
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
            <div className='nav__mobile-wrapper'
                onClick={(event) => event.currentTarget.classList.toggle('active')}
            >
                <div className='nav__mobile-target' />
                <div className='nav__mobile-menu'>
                    <NavLink to={ROUTES.VISAS} className='nav__link'>Визы</NavLink>
                    <NavLink to='' className='nav__link'>Cтраница 3</NavLink>
                    <NavLink to='' className='nav__link'>Страница 4</NavLink>
                </div>
        </div>
            <Nav.Item >
                <NavLink
                    to={ROUTES.HOME}
                    className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                >
                    <img className="visa_picture" src="/front/visa_label_blue.png" />Визовый центр РФ
                </NavLink>
            </Nav.Item>

            <Nav.Item className="nav-link-container">
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