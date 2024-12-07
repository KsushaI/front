// src/components/AuthButton.js
/*
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from "../../../slices/authSlice"
import { ROUTES} from "../../../Routes";
import { Link } from "react-router-dom";
const AuthButton = () => {
  const dispatch = useDispatch();
  const { token, username } = useSelector((state: any) => state.auth);

  const handleLogin = () => {
    // Simulate a login action (you would replace this with your actual API call)
    const userData = { username: 'JohnDoe' }; // Example user data
    dispatch(login(userData));
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('session_id');
    document.cookie = "session_id=; path=/; max-age=0"; // Clear cookie
    // Optionally redirect to login page or home page
    
  };

  



  return (
    <header>
      <h1>My Application</h1>
      {token ? (
        <div>
          <span>Welcome, {username}</span>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      ) : (
        <button onClick={() => console.log('Login')}>Log In</button>
      )}
    </header>
  );
};


export default AuthButton;
*/

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../slices/authSlice'; // Adjust the path as necessary
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../Routes"
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button"
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import "../Navbar/index.css"
const AuthButton: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { isAuthenticated, user } = useSelector((state: any) => state.auth); // Adjust the state type if necessary

  const handleLogout = () => {
    dispatch(logout());
    document.cookie = "session_id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    localStorage.removeItem('session_id'); // Clear session_id from localStorage
    navigate(ROUTES.VISAS)
    // Redirect to login page or home page
  };
  const location = useLocation();
  const [activeKey, setActiveKey] = useState('/');
  useEffect(() => {
    setActiveKey(location.pathname);
  }, [location]);

  return (
    /*
    <>
    
   
      {isAuthenticated ? (
        <div className='right-part'>
           <Link to={`${ROUTES.ACC}/${user?.user_id}`} className='linky'>{user?.username}</Link>
      
          <Button onClick={handleLogout}>Log Out</Button>
        </div>
      ) : (
        <>
        <div>
        <Button onClick={() =>navigate(ROUTES.AUTH)}>Войти</Button>
        <Button variant="warning"   onClick={() =>navigate(ROUTES.REGISTRATION)}>Зарегистрироваться</Button>
        </div>
        </>
      )}
    </>*/




    <Nav
      className="navbar justify-content-center"

      activeKey={activeKey}
    >
      {isAuthenticated ? (
        <>
          <Nav.Item >
            <NavLink
              to={`${ROUTES.ACC}/${user?.user_id}`}
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              {user?.username}
            </NavLink>
          </Nav.Item>
          <Nav.Item className="nav-link-container">
            <a
              href="#"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault(); // Prevent the default link behavior
                handleLogout(); // Call the logout function
              }}
            >
              Выйти
            </a>
          </Nav.Item>
        </>) : (
        <>
          <Nav.Item className="nav-link-container">
            <NavLink
              to={ROUTES.AUTH}
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              Войти
            </NavLink>
          </Nav.Item>
          <Nav.Item className="nav-link-container">
            <NavLink
              to={ROUTES.REGISTRATION}
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              Зарегистрироваться
            </NavLink>
          </Nav.Item>
        </>
      )}
    </Nav>
  );
};

export default AuthButton;




