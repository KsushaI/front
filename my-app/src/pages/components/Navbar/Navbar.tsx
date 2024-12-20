import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ROUTES } from '../../../Routes'
import "./index.css"

const Navbar = () => {
    const location = useLocation();
    const [activeKey, setActiveKey] = useState('/');
    const { isAuthenticated, user } = useSelector((state: any) => state.auth);
    useEffect(() => {
        setActiveKey(location.pathname);
        console.log(user?.user_id)
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

            {isAuthenticated &&
                <Nav.Item className="nav-link-container">
                    <NavLink
                        to={ROUTES.APPS}
                        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                    >
                        Заявки
                    </NavLink>
                </Nav.Item>
            }

            {isAuthenticated && user?.is_staff && (
                <Nav.Item className="nav-link-container">
                    <NavLink
                        to={ROUTES.SERVICES}
                        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                    >
                        Список виз
                    </NavLink>
                </Nav.Item>
            )}
        </Nav>
    );
}

export default Navbar;