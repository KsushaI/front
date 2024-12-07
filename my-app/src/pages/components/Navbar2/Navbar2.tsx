import Nav from 'react-bootstrap/Nav';
import { NavLink} from 'react-router-dom';
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
             <div className='nav__mobile-wrapper2'
                onClick={(event) => event.currentTarget.classList.toggle('active')}
            >
                <div className='nav__mobile-target2' />
                <div className='nav__mobile-menu2'>
                    <NavLink to={ROUTES.VISAS} className='nav__link2'>Визы</NavLink>
                </div>
            </div>
            <Nav.Item>
                <NavLink
                    to={ROUTES.HOME}
                    className={({ isActive }) => (isActive ? "navbar2 nav-link active" : "navbar2 nav-link")}
                >
                    <img className="visa_picture" src="/front/visa_label_white.png"/>Визовый центр РФ
                </NavLink>
            </Nav.Item>

            <Nav.Item className="nav-link-container">
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